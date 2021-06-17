<script>
    let name = "world";
</script>

<style>
</style>

<h1 class="text-yellow-600 bg-teal">Hello {name}, welcome to Svelte</h1>
<input bind:value="{name}"/>
<button class="btn-blue" type="submit">Submit</button>
