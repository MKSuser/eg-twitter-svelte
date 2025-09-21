<script lang="ts">
  import './styles.css'

  const LONGITUD_MAXIMA = 140

  const claseEspacioRestante = (restantes: number): string =>
    restantes > 10 ? 'ok' : restantes > 5 ? 'limite' : 'pasado'

  let tweet = $state('')
  let restantes = $derived(LONGITUD_MAXIMA - tweet.length)
  let espacioRestanteClass = $derived(claseEspacioRestante(restantes))
</script>

<article class="container">
  <h1>Twitter - Svelte</h1>

  <form name="form" class="form">
    <div>
      <textarea
        id="texto"
        name="texto"
        data-testid="texto"
        placeholder="¿Qué estás pensando?"
        bind:value={tweet}
      ></textarea>
    </div>

    <div>
      <span data-testid="restantes" class="badge {espacioRestanteClass}">
        {restantes}
      </span>
    </div>
  </form>
</article>
