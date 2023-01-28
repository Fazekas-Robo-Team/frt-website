<script lang="ts">
    import type Social from './About.svelte';

    export let title:string = "";
    export let roles:string[] = [];
    export let img:string = "https://avatars.githubusercontent.com/u/44097962?v=4";
    export let description:string = "";
</script>

<div class="about card { description ? "long" : "" }">
    <div class="card-header">
        <img src="{img}" alt="robot"/>
    </div>
    <div class="content">
        <h3>{title}</h3>
        {#if description}<p>{description}</p>{/if}
        <h4>
            {#each roles as role}
                <span class="role">{role}</span>
            {/each}
        </h4>

    </div>
</div>