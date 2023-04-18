import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import sharp from 'sharp';

export const load = (async ({ params, locals: { supabase }}) => {
    const { slug } = params;

    const { data: article, error } = await supabase.from('articles').select('*, profiles(full_name)').eq('id', slug);

    if (error) {
        return fail(500, error);
    }

    return {
        article: article?.[0]
    };
}) satisfies PageServerLoad;

export const actions = {
    imageUpload: async ({ params, request, locals: { supabase } }) => {
        const { slug } = params;

        const formData = await request.formData();
        
        const file = formData.get('file') as File;

        if (!file) return fail(500, 'No file uploaded' as unknown as Record<string, unknown>)

        // create a fileName const with .webp extension
        const fileName = file.name.split('.')[0] + '.webp';

        const buffer = await file.arrayBuffer();
        const webpBuffer = await sharp(buffer).resize({width:800, fit:"contain"}).webp().toBuffer();

        // create a webp file
        const webp = new File([webpBuffer], fileName, { type: 'image/webp' });

        const { data: image, error } = await supabase.storage.from('blog').upload(`${slug}/${fileName}`, webp);

        // get the image url
        const { data: imageUrl } = await supabase.storage.from('blog').getPublicUrl(`${slug}/${fileName}`);

        if (error) {
            if ('statusCode' in error) {
                if (error.statusCode == 409) {
                    // image already exists
                    return {
                        "message": "Image already uploaded",
                        "fileName": fileName,
                        "imageUrl": imageUrl.publicUrl
                    }
                }
            }
            return {
                "message": "Image upload failed",
                "error": error
            }
        }

        return {
            "message": "Image uploaded successfully",
            "fileName": fileName,
            "imageUrl": imageUrl.publicUrl
        }
    }
} satisfies Actions;