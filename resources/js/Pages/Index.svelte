<script>
    let name = "world";
</script>

<h1 class="text-green-600 bg-teal">Hello {name}, welcome to Svelte</h1>
<input bind:value={name} />
<button class="btn-blue " type="submit">Submit</button>

<style>
</style>
