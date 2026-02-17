// PRMovies countdown bypass - automatically redirects from countdown page to main site
(() => {
  if (window.location.hostname === 'prmovies.mba') {
    fetch('https://rep.prmovies3.online/api/get?v=' + Date.now(), {
      cache: 'no-cache'
    })
    .then(response => response.json())
    .then(data => {
      if (data && data.key) {
        const decodedKey = atob(data.key);
        window.location.href = 'https://' + decodedKey;
      }
    })
    .catch(error => {
      console.log('PRMovies auto-redirect failed:', error);
    });
  }
})();