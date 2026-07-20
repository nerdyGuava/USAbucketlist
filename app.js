/* ========================================================
   1. HARDCODED DATA STRUCTURE
   ======================================================== */
   const statesData = [
    { code: "AL", name: "Alabama", visited: false },
    { code: "AK", name: "Alaska", visited: false },
    { code: "AZ", name: "Arizona", visited: true, date: "March 2025", icon: "🌵", memory: "Witnessed a breathtaking sunset over the Grand Canyon south rim!" },
    { code: "AR", name: "Arkansas", visited: false },
    { code: "CA", name: "California", visited: true, date: "October 2023", icon: "🌉", memory: "Drove down Highway 1 and hiked among the giant coastal Redwoods." },
    { code: "CO", name: "Colorado", visited: false },
    { code: "CT", name: "Connecticut", visited: false },
    { code: "DE", name: "Delaware", visited: false },
    { code: "FL", name: "Florida", visited: false },
    { code: "GA", name: "Georgia", visited: false },
    { code: "HI", name: "Hawaii", visited: false },
    { code: "ID", name: "Idaho", visited: false },
    { code: "IL", name: "Illinois", visited: false },
    { code: "IN", name: "Indiana", visited: false },
    { code: "IA", name: "Iowa", visited: false },
    { code: "KS", name: "Kansas", visited: false },
    { code: "KY", name: "Kentucky", visited: false },
    { code: "LA", name: "Louisiana", visited: false },
    { code: "ME", name: "Maine", visited: false },
    { code: "MD", name: "Maryland", visited: false },
    { code: "MA", name: "Massachusetts", visited: false },
    { code: "MI", name: "Michigan", visited: false },
    { code: "MN", name: "Minnesota", visited: false },
    { code: "MS", name: "Mississippi", visited: false },
    { code: "MO", name: "Missouri", visited: false },
    { code: "MT", name: "Montana", visited: false },
    { code: "NE", name: "Nebraska", visited: false },
    { code: "NV", name: "Nevada", visited: false },
    { code: "NH", name: "New Hampshire", visited: false },
    { code: "NJ", name: "New Jersey", visited: false },
    { code: "NM", name: "New Mexico", visited: false },
    { code: "NY", name: "New York", visited: true, date: "December 2024", icon: "🗽", memory: "Saw Broadway shows and grabbed late-night pizza slices in Brooklyn." },
    { code: "NC", name: "North Carolina", visited: false },
    { code: "ND", name: "North Dakota", visited: false },
    { code: "OH", name: "Ohio", visited: false },
    { code: "OK", name: "Oklahoma", visited: false },
    { code: "OR", name: "Oregon", visited: true, date: "September 2024", icon: "🌲", memory: "Explored Portland food trucks and drove down the rainy coast." },
    { code: "PA", name: "Pennsylvania", visited: false },
    { code: "RI", name: "Rhode Island", visited: false },
    { code: "SC", name: "South Carolina", visited: false },
    { code: "SD", name: "South Dakota", visited: false },
    { code: "TN", name: "Tennessee", visited: false },
    { code: "TX", name: "Texas", visited: false },
    { code: "UT", name: "Utah", visited: false },
    { code: "VT", name: "Vermont", visited: false },
    { code: "VA", name: "Virginia", visited: false },
    { code: "WA", name: "Washington", visited: false },
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
    progressText.textContent = `${visitedCount} / 50 States Visited (${percentage}%)`;
  
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
  
  /* ==========================================================
     4. MODAL LOGIC
     ========================================================== */
  const modalOverlay = document.getElementById('modalOverlay');
  const modalContent = document.getElementById('modalContent');
  const modalClose = document.getElementById('modalClose');
  
  function openModal(state) {
    modalContent.innerHTML = `
      <div style="text-align: center;">
        <div style="font-size: 3rem; margin-bottom: 8px;">${state.icon || '📌'}</div>
        <h3 style="text-transform: uppercase; letter-spacing: 1px; color: var(--passport-ink);">${state.name} Stamp</h3>
        <p style="font-size: 0.85rem; color: #777; margin-bottom: 16px;">Stamped on: <strong>${state.date}</strong></p>
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
  
  // Run on page ready
  initDashboard();
  initMap();