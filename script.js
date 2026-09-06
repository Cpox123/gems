const fallbackGems = [
  {
    id: "blue-sapphire",
    name: "Blue Sapphire",
    sinhala: "නිල් මැණික",
    color: "blue",
    detail: "Oval cut • Ceylon",
    price: "Ask for price",
    image: "https://images.pexels.com/photos/14058109/pexels-photo-14058109.jpeg?auto=compress&cs=tinysrgb&w=1000"
  },
  {
    id: "royal-blue",
    name: "Royal Blue Sapphire",
    sinhala: "රාජකීය නිල් මැණික",
    color: "blue",
    detail: "Polished • Ceylon",
    price: "Ask for price",
    image: "https://images.pexels.com/photos/17486900/pexels-photo-17486900.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    id: "ruby",
    name: "Ruby",
    sinhala: "රතු මැණික",
    color: "red",
    detail: "Round cut • Natural",
    price: "Ask for price",
    image: "https://images.pexels.com/photos/16975999/pexels-photo-16975999.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    id: "green-stone",
    name: "Green Gem",
    sinhala: "කොළ මැණික",
    color: "green",
    detail: "Oval cut • Natural",
    price: "Ask for price",
    image: "https://images.pexels.com/photos/4040646/pexels-photo-4040646.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    id: "yellow-sapphire",
    name: "Yellow Sapphire",
    sinhala: "කහ පුෂ්පරාග",
    color: "yellow",
    detail: "Polished • Ceylon",
    price: "Ask for price",
    image: "https://images.pexels.com/photos/6468513/pexels-photo-6468513.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    id: "golden-gem",
    name: "Golden Gem",
    sinhala: "රන් පැහැ මැණික",
    color: "yellow",
    detail: "Cushion cut • Natural",
    price: "Ask for price",
    image: "https://images.pexels.com/photos/8581107/pexels-photo-8581107.jpeg?auto=compress&cs=tinysrgb&w=1200"
  }
];

let gems = [...fallbackGems];
const grid = document.getElementById("gemGrid");
const gemSelect = document.getElementById("gemSelect");

function renderGems(filter = "all") {
  const visible = filter === "all" ? gems : gems.filter(g => g.color === filter);
  grid.innerHTML = visible.map(gem => `
    <article class="gem-card">
      <img src="${gem.image}" alt="${gem.name}" loading="lazy">
      <div class="gem-body">
        <span class="gem-label">${gem.sinhala}</span>
        <h3>${gem.name}</h3>
        <div class="gem-meta"><span>${gem.detail}</span><span>${gem.price}</span></div>
        <a class="gem-action" href="#enquiry" data-gem="${gem.name}">විමසන්න →</a>
      </div>
    </article>
  `).join("");

  document.querySelectorAll("[data-gem]").forEach(link => {
    link.addEventListener("click", () => {
      gemSelect.value = link.dataset.gem;
    });
  });
}

function fillSelect() {
  const current = gemSelect.value;
  gemSelect.innerHTML = `<option value="">මැණිකක් තෝරන්න</option>` + gems.map(g => `<option value="${g.name}">${g.name} - ${g.sinhala}</option>`).join("");
  if (current) gemSelect.value = current;
}

async function loadGems() {
  try {
    const response = await fetch("content/gems/index.json", {cache: "no-store"});
    if (!response.ok) throw new Error("Could not load gem data");
    const data = await response.json();
    if (Array.isArray(data) && data.length) gems = data;
  } catch (error) {
    // Local file preview can block fetch. The fallback data keeps the sample working.
  }
  fillSelect();
  renderGems();
}

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    renderGems(button.dataset.color);
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => navLinks.classList.remove("open")));

document.getElementById("enquiryForm").addEventListener("submit", event => {
  event.preventDefault();
  document.getElementById("formNote").textContent = "Demo enquiry ready. Final version එකේ මේ button එක WhatsApp එකට connect කරන්න පුළුවන්.";
});

loadGems();
