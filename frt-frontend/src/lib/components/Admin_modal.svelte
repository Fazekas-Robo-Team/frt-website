<script lang="ts">
	export let modalTitle: string = "Modal title";
    export let modalText: string = "Modal text";

    import { onMount } from 'svelte';

    let modalClass: string = "modal-enter";

    onMount(() => {
        setTimeout(() => {
            modalClass = "modal-enter-active";
        }, 100);

        setTimeout(() => {
            modalClass = "modal-exit-active";
        }, 3350);
    });
</script>

<div class="fixed z-50 {modalClass} right-0 top-0" aria-labelledby="modal-title" role="dialog" aria-modal="true">
	<div class="flex items-end justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
		<!-- Background overlay -->
		<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" />

		<!-- Modal -->
		<div
			class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all m-4 sm:align-middle w-80"
		>
			<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
				<div class="sm:flex sm:items-start">
					<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
						<h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">{modalTitle}</h3>
						<div class="mt-2">
							<p class="text-sm text-gray-500">{modalText}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
    /* animation */
    .modal-enter {
        opacity: 0;
        transform: scale(0.95);
    }

    .modal-enter-active {
        opacity: 1;
        transform: scale(1);
        transition: opacity 250ms, transform 250ms;
    }

    .modal-exit {
        opacity: 1;
        transform: scale(1);
    }

    .modal-exit-active {
        opacity: 0;
        transform: scale(0.95);
        transition: opacity 250ms, transform 250ms;
    }


</style>