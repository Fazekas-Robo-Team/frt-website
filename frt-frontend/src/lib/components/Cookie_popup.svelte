<script lang="ts">
	import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import { cookie } from "../../routes/stores";

    let cookie_accepted: boolean = true, cookie_rejected: boolean = true;

    onMount(() => {
        cookie_accepted = localStorage.getItem("cookie_accepted") === "true";
        if (cookie_accepted == true) {
            cookie.set(true);
        }
        cookie_rejected = localStorage.getItem("cookie_accepted") === "false";
    });

    function rejectCookies() {
        localStorage.setItem("cookie_accepted", "false");
        cookie_accepted = localStorage.getItem("cookie_accepted") === "true";
        // take the user to the rickroll video
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }

    function acceptCookies() {
        localStorage.setItem("cookie_accepted", "true");
        cookie_accepted = localStorage.getItem("cookie_accepted") === "true";

        cookie.set(true);
    }

</script>

<div class="{cookie_accepted ? "hidden": ""} fixed bottom-4 right-4 bg-white border-black border-2 w-80 h-96 flex justify-center items-center">
    <div class="w-5/6 h-5/6 flex flex-col justify-between">
        <div class="flex flex-col">
            <h1 class="text-2xl font-semibold">Ez az oldal is cookie-kat használ</h1>
            <p class="text-sm">
                {#if cookie_accepted == false && cookie_rejected == false}
                    Az oldal további használatával elfogadod a cookie-k használatát.
                {:else if cookie_rejected == true}
                    Nem használunk több cookie-t, de ez a popup csak akkor fog eltűnni, ha elfogadod a cookie-k használatát ¯\_(ツ)_/¯
                {/if}
            </p>
        </div>
        <div class="flex justify-end">
            <button on:click={acceptCookies} class="bg-success text-white text-sm font-semibold px-4 py-2 mx-2 border-black border-2 drop-shadow-xl-black-br hover:drop-shadow-md-black-br hover:translate-x-5px hover:translate-y-5px">
                Elfogadom
            </button>

            <button on:click={rejectCookies} class="bg-danger text-white text-sm font-semibold px-4 py-2 mx-2 border-black border-2 drop-shadow-xl-black-br hover:drop-shadow-md-black-br hover:translate-x-5px hover:translate-y-5px">
                Nem fogadom el
            </button>
        </div>
    </div>
</div>