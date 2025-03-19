const channels = [
    {
        category: "Chaînes générales",
        items: [
            { name: "TF1", url: "https://raw.githubusercontent.com/Paradise-91/ParaTV/main/streams/tf1plus/tf1.m3u8" },
            { name: "France 2", url: "https://raw.githubusercontent.com/Paradise-91/ParaTV/main/streams/francetv/france2.m3u8" },
            { name: "France 3", url: "https://raw.githubusercontent.com/Paradise-91/ParaTV/main/streams/francetv/france3.m3u8" },
            { name: "France 4", url: "https://raw.githubusercontent.com/Paradise-91/ParaTV/main/streams/francetv/france4.m3u8" },
            { name: "France 5", url: "https://raw.githubusercontent.com/Paradise-91/ParaTV/main/streams/francetv/france5.m3u8" },
            { name: "M6", url: "https://iptv1.french-live.lol:443/live/70013B23F3440093B75C4C8CF5C5C84D/102.m3u8" },
            { name: "TMC", url: "https://raw.githubusercontent.com/Paradise-91/ParaTV/main/streams/tf1plus/tmc.m3u8" },
            { name: "CANAL+", url: "https://iptv1.french-live.lol:443/live/70013B23F3440093B75C4C8CF5C5C84D/106.m3u8" }
        ]
    },
    {
        category: "Chaînes musicales",
        items: [
            { name: "W9", url: "https://iptv1.french-live.lol:443/live/70013B23F3440093B75C4C8CF5C5C84D/79.m3u8" },
            { name: "NRJ", url: "https://raw.githubusercontent.com/Paradise-91/ParaTV/main/streams/nrj/cherie25.m3u8" },
            { name: "M6 Music", url: "https://iptv1.french-live.lol:443/live/70013B23F3440093B75C4C8CF5C5C84D/110.m3u8" },
            { name: "CSTAR / C8", url: "https://raw.githubusercontent.com/Paradise-91/ParaTV/main/streams/canalplus/cstar-dm.m3u8" }
        ]
    },
    {
        category: "Chaînes sportives",
        items: [
            { name: "CANAL+ Sport", url: "https://iptv1.french-live.lol:443/live/70013B23F3440093B75C4C8CF5C5C84D/54.m3u8" },
            { name: "CANAL+ Foot", url: "https://iptv1.french-live.lol:443/live/70013B23F3440093B75C4C8CF5C5C84D/88.m3u8" }
        ]
    },
    {
        category: "Chaînes jeunesse",
        items: [
            { name: "Gulli", url: "https://raw.githubusercontent.com/Paradise-91/ParaTV/main/streams/m6plus/gulli.m3u8" },
            { name: "Canal J", url: "https://iptv1.french-live.lol:443/live/70013B23F3440093B75C4C8CF5C5C84D/179.m3u8" },
            { name: "Nickelodeon", url: "https://iptv1.french-live.lol:443/live/70013B23F3440093B75C4C8CF5C5C84D/178.m3u8" },
            { name: "Boomerang", url: "https://iptv1.french-live.lol:443/live/70013B23F3440093B75C4C8CF5C5C84D/180.m3u8" },
            { name: "Disney Channel", url: "https://iptv1.french-live.lol:443/live/70013B23F3440093B75C4C8CF5C5C84D/205.m3u8" },
            { name: "Mangas", url: "https://iptv1.french-live.lol:443/live/70013B23F3440093B75C4C8CF5C5C84D/97.m3u8" },
            { name: "Game One", url: "https://iptv1.french-live.lol:443/live/70013B23F3440093B75C4C8CF5C5C84D/104.m3u8" },
            { name: "Yu-Gi-Oh", url: "https://fastmedia-yu-gi-oh-4-fr.rakuten.wurl.tv/playlist.m3u8" },
            { name: "Naruto", url: "https://raw.githubusercontent.com/Paradise-91/ParaTV/main/streams/tf1plus/naruto.m3u8" },
            { name: "Boruto", url: "https://raw.githubusercontent.com/Paradise-91/ParaTV/main/streams/tf1plus/boruto-naruto-next-generatio.m3u8" },
            { name: "Inazuma-eleven", url: "https://raw.githubusercontent.com/Paradise-91/ParaTV/main/streams/tf1plus/inazuma-eleven.m3u8" }
        ]
    },
    {
        category: "Chaînes d'actualité",
        items: [
            { name: "BFMTV", url: "https://iptv1.french-live.lol:443/live/70013B23F3440093B75C4C8CF5C5C84D/169.m3u8" },
            { name: "CNEWS", url: "https://iptv1.french-live.lol:443/live/70013B23F3440093B75C4C8CF5C5C84D/171.m3u8" },
            { name: "ARTE", url: "https://artesimulcast.akamaized.net/hls/live/2031003/artelive_fr/index.m3u8" }
        ]
    }
  ];
  
  const dropdownInput = document.getElementById('dropdownInput');
  const channelList = document.getElementById('channelList');
  const video = document.getElementById('video');
  const favoritesMenu = document.getElementById('favoritesMenu');
  const favoritesList = document.getElementById('favoritesList');
  const toggleFavorites = document.getElementById('toggleFavorites');
  
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
  function updateList(filter = "") {
    channelList.innerHTML = "";
    let found = false;
  
    channels.forEach(category => {
        const filtered = category.items.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()));
  
        if (filtered.length > 0) {
            const categoryHeader = document.createElement('li');
            categoryHeader.textContent = category.category;
            categoryHeader.classList.add('category-header');
            channelList.appendChild(categoryHeader);
  
            filtered.forEach(channel => {
                const li = createChannelItem(channel);
                channelList.appendChild(li);
            });
            found = true;
        }
    });
  
    if (!found) {
        channelList.innerHTML = "<li>Aucune chaîne trouvée</li>";
    }
  
    channelList.style.display = 'block';
  }
  
  function createChannelItem(channel) {
    const li = document.createElement('li');
    li.classList.add('channel-item');
  
    const channelName = document.createElement('span');
    channelName.textContent = channel.name;
    
    const star = document.createElement('span');
    star.classList.add('star');
    star.textContent = favorites.some(fav => fav.name === channel.name) ? '⭐' : '☆'; // Affiche l'étoile pleine ou vide en fonction du statut favori
    star.onclick = (e) => {
        e.stopPropagation();  // Empêche le clic sur l'étoile de fermer la recherche
        toggleFavorite(channel);
    };
  
    li.appendChild(channelName);
    li.appendChild(star);
  
    li.addEventListener('click', () => {
        playChannel(channel.url);
        channelList.style.display = 'none'; // Ferme la recherche après le clic sur une chaîne
    });
  
    return li;
  }
  
  function toggleFavorite(channel) {
    if (favorites.some(fav => fav.name === channel.name)) {
        favorites = favorites.filter(fav => fav.name !== channel.name);
    } else {
        favorites.push(channel);
    }
  
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesMenu();
    updateList(dropdownInput.value);
  }
  
  function updateFavoritesMenu() {
    favoritesList.innerHTML = '';
  
    favorites.forEach(fav => {
        const li = document.createElement('li');
        li.textContent = fav.name;
        li.classList.add('channel-item');
        li.addEventListener('click', () => {
            playChannel(fav.url);
        });
        favoritesList.appendChild(li);
    });
  }
  
  toggleFavorites.addEventListener('click', () => {
    favoritesMenu.style.display = favoritesMenu.style.display === 'block' ? 'none' : 'block';
  });
  
  // Cache la liste des chaînes au début
  channelList.style.display = 'none';
  
  // Gestion combinée du clic et du focus sur le champ de recherche
  dropdownInput.addEventListener('click', () => {
    updateList("");
    channelList.style.display = 'block';
  });
  
  // Cache la liste lorsque l'utilisateur clique ailleurs
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-dropdown')) {
        channelList.style.display = 'none';
    }
    if (!e.target.closest('#favoritesMenu') && !e.target.closest('#toggleFavorites')) {
        favoritesMenu.style.display = 'none';
    }
  });
  
  // Mise à jour de la liste lors de la saisie
  dropdownInput.addEventListener('input', () => updateList(dropdownInput.value));
  
  function playChannel(url) {
    const loader = document.getElementById('loader');
    loader.style.display = 'block';
  
    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
  
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
            video.play();
        });
  
        hls.on(Hls.Events.LEVEL_LOADED, function () {
            loader.style.display = 'none';
        });
  
        hls.on(Hls.Events.ERROR, function () {
            loader.style.display = 'none';
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
        video.addEventListener('loadedmetadata', function () {
            loader.style.display = 'none';
            video.play();
        });
        video.addEventListener('error', function () {
            loader.style.display = 'none';
        });
    } else {
        loader.style.display = 'none';
    }
  }
  
  // Initialisation des favoris
  updateFavoritesMenu();