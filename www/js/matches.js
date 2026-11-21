(() => {
  const statusLabel = status => {
    if (["1H","2H","ET","P","LIVE"].includes(status)) return "AO VIVO";
    if (["FT","AET","PEN"].includes(status)) return "TERMINADO";
    return status || "AGENDADO";
  };
  const statusClass = status => ["1H","2H","ET","P","LIVE"].includes(status) ? "live" :
    (["FT","AET","PEN"].includes(status) ? "finished" : "");
  function card(match) {
    const home = match.teams?.home?.name || "Equipa da casa";
    const away = match.teams?.away?.name || "Equipa visitante";
    const homeScore = match.goals?.home ?? "-";
    const awayScore = match.goals?.away ?? "-";
    const status = match.fixture?.status?.short || "NS";
    const elapsed = match.fixture?.status?.elapsed;
    const league = match.league?.name || "Competição";
    const time = elapsed ? `${elapsed}'` : (match.fixture?.date ? new Date(match.fixture.date).toLocaleTimeString("pt-PT",{hour:"2-digit",minute:"2-digit"}) : "—");
    return `<article class="match-card">
      <div class="match-card-top"><span class="league-name">${escapeHtml(league)}</span><span class="match-status ${statusClass(status)}">${statusLabel(status)} ${elapsed ? `· ${elapsed}'` : ""}</span></div>
      <div class="match-teams">
        <div class="team"><span class="team-logo">⚽</span><span class="team-name">${escapeHtml(home)}</span></div>
        <div class="score">${homeScore} : ${awayScore}</div>
        <div class="team away"><span class="team-logo">⚽</span><span class="team-name">${escapeHtml(away)}</span></div>
      </div>
      <div class="match-card-bottom"><span>${escapeHtml(match.league?.country || "")}</span><span>${status === "NS" ? time : "Dados do jogo"}</span></div>
    </article>`;
  }
  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  }
  function render(target, matches, emptyMessage) {
    const el = document.getElementById(target);
    if (!el) return;
    el.innerHTML = matches?.length ? matches.map(card).join("") :
      `<div class="empty-card"><span>⚽</span><strong>${emptyMessage || "Nenhum jogo encontrado."}</strong><small>Experimenta outra data ou verifica a ligação aos dados.</small></div>`;
  }
  window.MedbiMatches = { render, statusClass };
})();
