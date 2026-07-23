/* ========================================================
   1. HARDCODED DATA STRUCTURE
   ======================================================== */
   const statesData = [
    { code: "AL", name: "Alabama", visited: false },
    { code: "AK", name: "Alaska", visited: false },
    { code: "AZ", name: "Arizona", visited: true, date: "Home Base", icon: "🌵", memory: "Desert life with corgis. Stargazing in Flagstaff, road trips up to the Grand Canyon, and surviving the summer heat.", images: [
        "photos/az/adams_family.png",
        "photos/az/skeet_hoodie.jpg",
        "photos/az/pumpkin_run.png",
        "photos/az/stacey_hoodie.png",
        "photos/az/old_town.png"
      ], stampImg: "photos/az/stamps/stacey_hoodie.png" },
    { code: "AR", name: "Arkansas", visited: false },
    { code: "CA", name: "California", visited: true, date: "Visited", icon: "🌉", memory: "Our First Trip together, Pixar and SF, Disneyland and Corgi Beach Day with friends", images: [
        "photos/az/adams_family.png",
        "photos/az/skeet_hoodie.jpg",
        "photos/az/pumpkin_run.png",
        "photos/az/stacey_hoodie.png",
        "photos/az/old_town.png"
      ] },
    { code: "CO", name: "Colorado", visited: false },
    { code: "CT", name: "Connecticut", visited: false },
    { code: "DE", name: "Delaware", visited: false },
    { code: "FL", name: "Florida", visited: true, date: "Honeymoon", icon: "🏰", memory: "Unforgettable honeymoon at Disney World, fueled by iconic Pub Subs!" },
    { code: "GA", name: "Georgia", visited: false },
    { code: "HI", name: "Hawaii", visited: false },
    { code: "ID", name: "Idaho", visited: false },
    { code: "IL", name: "Illinois", visited: false },
    { code: "IN", name: "Indiana", visited: false },
    { code: "IA", name: "Iowa", visited: false },
    { code: "KS", name: "Kansas", visited: false },
    { code: "KY", name: "Kentucky", visited: false },
    { code: "LA", name: "Louisiana", visited: true, date: "Honeymoon", icon: "🎷", memory: "Explored New Orleans, devoured incredible po' boys, and survived a spooky haunted bar crawl!" },
    { code: "ME", name: "Maine", visited: false },
    { code: "MD", name: "Maryland", visited: false },
    { code: "MA", name: "Massachusetts", visited: false },
    { code: "MI", name: "Michigan", visited: false },
    { code: "MN", name: "Minnesota", visited: false },
    { code: "MS", name: "Mississippi", visited: true, date: "Honeymoon", icon: "🚔", memory: "A wild midnight drive accidentally following a high-speed chase, plus food that tasted like dish soap!" },
    { code: "MO", name: "Missouri", visited: false },
    { code: "MT", name: "Montana", visited: false },
    { code: "NE", name: "Nebraska", visited: false },
    { code: "NV", name: "Nevada", visited: true, date: "Visited", icon: "🎰", memory: "Visited host momma, dined at The STRAT, won Deal or No Deal, dodged a Wyndham scam for free Cirque du Soleil tickets!" },
    { code: "NH", name: "New Hampshire", visited: false },
    { code: "NJ", name: "New Jersey", visited: false },
    { code: "NM", name: "New Mexico", visited: true, date: "Honeymoon", icon: "👽", memory: "Hunted for aliens in Roswell and explored the mind-bending art of Meow Wolf!" },
    { code: "NY", name: "New York", visited: false },
    { code: "NC", name: "North Carolina", visited: false },
    { code: "ND", name: "North Dakota", visited: false },
    { code: "OH", name: "Ohio", visited: false },
    { code: "OK", name: "Oklahoma", visited: false },
    { code: "OR", name: "Oregon", visited: false },
    { code: "PA", name: "Pennsylvania", visited: false },
    { code: "RI", name: "Rhode Island", visited: false },
    { code: "SC", name: "South Carolina", visited: false },
    { code: "SD", name: "South Dakota", visited: false },
    { code: "TN", name: "Tennessee", visited: false },
    { code: "TX", name: "Texas", visited: true, date: "Honeymoon", icon: "🌮", memory: "Why was Van Horn so much fun?!?, Houston was a heart attack trying to drive through but the breakfast tacos were fire!" },
    { code: "UT", name: "Utah", visited: true, date: "Visited", icon: "🏔️", memory: "Snow tubing in Park City, keeping our freezing corgi cozy in hotel blankets, and braving a crazy snowstorm drive home!" },
    { code: "VT", name: "Vermont", visited: false },
    { code: "VA", name: "Virginia", visited: false },
    { code: "WA", name: "Washington", visited: true, date: "Visited", icon: "🌲", memory: "Loved Seattle when we didn't have a car, explored pretty Little Norway, lots of rain and seafood, and survived an oddly hilarious parking scam!" },
    { code: "WV", name: "West Virginia", visited: false },
    { code: "WI", name: "Wisconsin", visited: false },
    { code: "WY", name: "Wyoming", visited: false }
  ];
  
  /* Create a map lookup object for quick access */
  const stateMap = {};
  statesData.forEach(s => stateMap[s.name] = s);
  
  /* ==========================================================
     2. INITIALIZE PROGRESS BAR & STAMPS
     ========================================================== */
  const stampGrid = document.getElementById('stampGrid');
  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');
  
  function initDashboard() {
    const visitedCount = statesData.filter(s => s.visited).length;
    const percentage = Math.round((visitedCount / statesData.length) * 100);
  
    progressBar.style.width = percentage + '%';
    progressText.textContent = `${visitedCount} / 50 States (${percentage}%)`;
  
    stampGrid.innerHTML = '';
    statesData.forEach(state => {
      if (state.visited) {
        const stamp = document.createElement('div');
        stamp.className = 'stamp-card';
        stamp.innerHTML = `
          <span class="stamp-icon">${state.icon || '📌'}</span>
          <div class="stamp-name">${state.name}</div>
          <div class="stamp-date">${state.date}</div>
        `;
        stamp.addEventListener('click', () => openModal(state));
        stampGrid.appendChild(stamp);
      }
    });

    renderBadges();
    renderStampsGallery();
  }
  
  /* ==========================================================
   3. RENDER VECTOR MAP (FIXED VIEWBOX FOR RELIABLE RENDERING)
   ========================================================== */
function initMap() {
    // Standard US Map aspect ratio canvas
    const width = 960;
    const height = 600;
  
    const svg = d3.select("#mapSvg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("width", "100%")
        .attr("height", "100%");

    // --- ADD GLAM PINK GRADIENT DEF ---
    const defs = svg.append("defs");
    const gradient = defs.append("linearGradient")
        .attr("id", "pinkGradient")
        .attr("x1", "0%").attr("y1", "0%")
        .attr("x2", "100%").attr("y2", "100%");
    
    gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#ff2a85");
        
    gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#ff758c");
    // ----------------------------------
  
    const g = svg.append("g");
  
    // Standard Albers USA Projection scaled for 960x600 canvas
    const projection = d3.geoAlbersUsa()
      .scale(1200)
      .translate([width / 2, height / 2]);
  
    const path = d3.geoPath().projection(projection);
  
    // Zoom & Pan handler
    const zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on("zoom", (event) => g.attr("transform", event.transform));
  
    svg.call(zoom);
  
    // Fetch state topography directly from CDN (works on GitHub Pages!)
    d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json")
      .then(us => {
        const statesGeo = topojson.feature(us, us.objects.states).features;
  
        g.selectAll("path")
          .data(statesGeo)
          .enter()
          .append("path")
          .attr("d", path)
          .attr("class", d => {
            const stateData = stateMap[d.properties.name];
            return `state ${stateData && stateData.visited ? 'visited' : ''}`;
          })
          .on("click", (event, d) => {
            const stateData = stateMap[d.properties.name];
            if (stateData && stateData.visited) {
              openModal(stateData);
            }
          });
      })
      .catch(err => console.error("Error loading map topology:", err));
  
    // Zoom Controls
    document.getElementById('zoomInBtn').onclick = () => svg.transition().duration(300).call(zoom.scaleBy, 1.3);
    document.getElementById('zoomOutBtn').onclick = () => svg.transition().duration(300).call(zoom.scaleBy, 0.7);
    document.getElementById('resetZoomBtn').onclick = () => svg.transition().duration(300).call(zoom.transform, d3.zoomIdentity);
  }

  function renderPhotoPreviews(images) {
    if (!images || images.length === 0) return '';
  
    const maxPreviews = 3;
    const previewList = images.slice(0, maxPreviews);
    const extraCount = images.length - maxPreviews;
  
    let photosHtml = '<div class="photo-preview-row">';
  
    previewList.forEach((src, index) => {
      const isLast = index === maxPreviews - 1 && extraCount > 0;
      
      // Updated onclick to pass the photo index and the state's images array
      photosHtml += `
        <div class="photo-thumb-wrapper" onclick="openGallery(${index})">
          <img src="${src}" class="photo-thumb" alt="State photo" />
          ${isLast ? `<span class="more-overlay">+${extraCount} More</span>` : ''}
        </div>
      `;
    });
  
    photosHtml += '</div>';
    return photosHtml;
  }
  
  /* ==========================================================
     4. MODAL LOGIC
     ========================================================== */
  const modalOverlay = document.getElementById('modalOverlay');
  const modalContent = document.getElementById('modalContent');
  const modalClose = document.getElementById('modalClose');
  
  function openModal(state) {
    // 1. ADD THIS LINE: Generate the photo preview HTML string
    const photoHTML = renderPhotoPreviews(state.images);

    modalContent.innerHTML = `
      <div style="text-align: center;">
        <div style="font-size: 3rem; margin-bottom: 8px;">${state.icon || '📌'}</div>
        <h3 style="text-transform: uppercase; letter-spacing: 1px; color: var(--passport-ink);">${state.name} Stamp</h3>
        <p style="font-size: 0.85rem; color: #777; margin-bottom: 16px;">Stamped on: <strong>${state.date}</strong></p>
        
        <!-- 2. ADD THIS LINE: Inject the photo previews above memory -->
        ${photoHTML}

        <div style="background: #fdfbf7; border: 1px dashed #ccc; padding: 12px; border-radius: 8px; font-style: italic; margin-bottom: 12px;">
          "${state.memory}"
        </div>
      </div>
    `;
    modalOverlay.style.display = 'flex';
  }
  
  modalClose.addEventListener('click', () => modalOverlay.style.display = 'none');
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) modalOverlay.style.display = 'none';
  });

  /* ==========================================================
   BADGE DEFINITIONS & RULES
   ========================================================== */
const badgesData = [
    {
      id: "first_trip",
      title: "First Step",
      icon: "✈️",
      desc: "Visit your very first state together!",
      check: (visitedCodes) => visitedCodes.length >= 1
    },
    {
      id: "pacific",
      title: "Pacific Explorer",
      icon: "🌊",
      desc: "Visit CA, OR, and WA!",
      check: (visitedCodes) => ["CA", "OR", "WA"].every(code => visitedCodes.includes(code))
    },
    {
      id: "four_corners",
      title: "Desert Magic",
      icon: "🌵",
      desc: "Explore AZ, UT, and NM!",
      check: (visitedCodes) => ["AZ", "UT", "NM"].every(code => visitedCodes.includes(code))
    },
    {
        id: "new_england",
        title: "New Englander",
        icon: "🌲",
        desc: "Visit all 6 New England states!",
        check: (visitedCodes) => ["ME", "NH", "VT", "MA", "RI", "CT"].every(c => visitedCodes.includes(c))
      },
      {
        id: "southern_coast",
        title: "Southern Cross-Country",
        icon: "☀️",
        desc: "Go coast-to-coast across the South!",
        check: (visitedCodes) => ["CA", "AZ", "NM", "TX", "LA", "MS", "AL", "FL"].every(c => visitedCodes.includes(c))
      },
      {
        id: "northern_tier",
        title: "Northern Tier",
        icon: "🏔️",
        desc: "Go coast-to-coast across the North!",
        check: (visitedCodes) => ["WA", "ID", "MT", "ND", "MN", "WI", "MI", "NY", "VT", "NH", "ME"].every(c => visitedCodes.includes(c))
      },
      {
        id: "east_coast",
        title: "Atlantic Voyager",
        icon: "🌊",
        desc: "Visit all 14 East Coast states!",
        check: (visitedCodes) => ["ME", "NH", "MA", "RI", "CT", "NY", "NJ", "DE", "MD", "VA", "NC", "SC", "GA", "FL"].every(c => visitedCodes.includes(c))
      },
      {
        id: "route_66",
        title: "Main Street USA",
        icon: "🛣️",
        desc: "Travel the full path of Route 66!",
        check: (visitedCodes) => ["IL", "MO", "KS", "OK", "TX", "NM", "AZ", "CA"].every(c => visitedCodes.includes(c))
      },
      {
        id: "alien_chaser",
        title: "Extraterrestrial",
        icon: "🛸",
        desc: "Visit top UFO hotspots Nevada and New Mexico!",
        check: (visitedCodes) => ["NM", "NV"].every(c => visitedCodes.includes(c))
      },
      {
        id: "gulf_coast",
        title: "Gulf Breeze",
        icon: "🦐",
        desc: "Touch all 5 Gulf Coast states!",
        check: (visitedCodes) => ["TX", "LA", "MS", "AL", "FL"].every(c => visitedCodes.includes(c))
      },
      {
        id: "four_corners",
        title: "Corner Hopper",
        icon: "📐",
        desc: "Visit all Four Corners states!",
        check: (visitedCodes) => ["AZ", "UT", "CO", "NM"].every(c => visitedCodes.includes(c))
      },
      {
        id: "non_contiguous",
        title: "Beyond the Lower 48",
        icon: "✈️",
        desc: "Visit Alaska and Hawaii!",
        check: (visitedCodes) => ["AK", "HI"].every(c => visitedCodes.includes(c))
      },
    {
      id: "quarter_way",
      title: "Quarter Century",
      icon: "🥉",
      desc: "Reach 12 states visited!",
      check: (visitedCodes) => visitedCodes.length >= 12
    },
    {
      id: "halfway",
      title: "Halfway Glam",
      icon: "👑",
      desc: "Reach 25 states visited!",
      check: (visitedCodes) => visitedCodes.length >= 25
    },
    {
      id: "all_50",
      title: "Ultimate USA Queens",
      icon: "💖",
      desc: "Visit all 50 states!",
      check: (visitedCodes) => visitedCodes.length === 50
    }
  ];
  
  /* ==========================================================
     RENDER BADGES IN TROPHY CASE
     ========================================================== */
  function renderBadges() {
    const badgeGrid = document.getElementById('badgeGrid');
    if (!badgeGrid) return;
  
    badgeGrid.innerHTML = '';
  
    // Get list of currently visited state codes (e.g. ['CA', 'AZ', 'NY', 'OR'])
    const visitedCodes = statesData.filter(s => s.visited).map(s => s.code);
  
    badgesData.forEach(badge => {
      const isUnlocked = badge.check(visitedCodes);
  
      const badgeCard = document.createElement('div');
      badgeCard.className = `badge-card ${isUnlocked ? 'unlocked' : ''}`;
      
      badgeCard.innerHTML = `
        <span class="badge-icon">${badge.icon}</span>
        <div class="badge-title">${badge.title}</div>
        <div class="badge-desc">${badge.desc}</div>
        <span class="badge-status">${isUnlocked ? 'Unlocked ✨' : '🔒 Locked'}</span>
      `;
  
      badgeGrid.appendChild(badgeCard);
    });
  }

  /* ==========================================================
   GALLERY LIGHTBOX LOGIC
   ========================================================== */
let currentGalleryImages = [];
let currentImageIndex = 0;

function openModal(state) {
  // Store the active state's image array globally so the gallery can use it
  currentGalleryImages = state.images || [];
  
  const photoHTML = renderPhotoPreviews(state.images);

  modalContent.innerHTML = `
    <div style="text-align: center;">
      <div style="font-size: 3rem; margin-bottom: 8px;">${state.icon || '📌'}</div>
      <h3 style="text-transform: uppercase; letter-spacing: 1px; color: var(--passport-ink);">${state.name} Stamp</h3>
      <p style="font-size: 0.85rem; color: #777; margin-bottom: 16px;">Stamped on: <strong>${state.date}</strong></p>
      
      ${photoHTML}

      <div style="background: #fdfbf7; border: 1px dashed #ccc; padding: 12px; border-radius: 8px; font-style: italic; margin-bottom: 12px;">
        "${state.memory}"
      </div>
    </div>
  `;
  modalOverlay.style.display = 'flex';
}

function openGallery(index = 0) {
  if (!currentGalleryImages.length) return;
  currentImageIndex = index;
  updateGalleryImage();
  document.getElementById('galleryOverlay').style.display = 'flex';
}

function updateGalleryImage() {
  const imgElem = document.getElementById('galleryImage');
  const counterElem = document.getElementById('galleryCounter');
  
  imgElem.src = currentGalleryImages[currentImageIndex];
  counterElem.textContent = `${currentImageIndex + 1} / ${currentGalleryImages.length}`;
}

// Controls
document.getElementById('galleryClose').onclick = () => {
  document.getElementById('galleryOverlay').style.display = 'none';
};

document.getElementById('prevImgBtn').onclick = () => {
  currentImageIndex = (currentImageIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
  updateGalleryImage();
};

document.getElementById('nextImgBtn').onclick = () => {
  currentImageIndex = (currentImageIndex + 1) % currentGalleryImages.length;
  updateGalleryImage();
};

/* ==========================================================
   RENDER STAMPS GALLERY
   ========================================================== */
   function renderStampsGallery() {
    const stampsGrid = document.getElementById('stampsGalleryGrid');
    if (!stampsGrid) return;
  
    stampsGrid.innerHTML = '';
  
    statesData.forEach(state => {
      if (state.stampImg) {
        const stampDiv = document.createElement('div');
        stampDiv.className = `stamp-item ${state.visited ? 'unlocked' : 'locked'}`;
        stampDiv.title = `${state.name} Stamp`;
  
        stampDiv.innerHTML = `
          <img src="${state.stampImg}" alt="${state.name} Stamp" />
        `;
  
        // CLICK ACTION: Opens full-screen stamp preview
        stampDiv.addEventListener('click', () => {
          if (state.visited) {
            openSingleStampLightbox(state.stampImg);
          }
        });
  
        stampsGrid.appendChild(stampDiv);
      }
    });
  }
  
  /* Helper to launch full-screen preview for a stamp */
  function openSingleStampLightbox(imgSrc) {
    currentGalleryImages = [imgSrc];
    currentImageIndex = 0;
    
    // Uses your existing gallery lightbox elements
    const imgElem = document.getElementById('galleryImage');
    const counterElem = document.getElementById('galleryCounter');
    
    if (imgElem) imgElem.src = imgSrc;
    if (counterElem) counterElem.textContent = "1 / 1";
    
    document.getElementById('galleryOverlay').style.display = 'flex';
  }
  
  
  // Run on page ready
  initDashboard();
  initMap();