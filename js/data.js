/* ============================================================
   HASSAN — Mock Data Layer (stand-in for a real API)
============================================================ */

const H_CATEGORIES = [
  { name: 'Outerwear', slug: 'outerwear', image: 'photos/img.jpeg' },
  { name: 'Shirts', slug: 'shirts', image: 'photos/img2.jpeg' },
  { name: 'Knitwear', slug: 'knitwear', image: 'photos/img3.jpeg' },
  { name: 'Trousers', slug: 'trousers', image: 'photos/img4.jpeg' },
  { name: 'Denim', slug: 'denim', image: 'photos/img.jpeg' },
  { name: 'Accessories', slug: 'accessories', image: 'photos/img18.jpeg' },
];

const H_COLORS = {
  Onyx: '#ffffff', Charcoal: '#666666', Camel: '#A9824C', Bone: '#D9D3C4', Gold: '#D4AF37', Bottle: '#2C4A3E'
};

const H_PALETTES = [
  { bg: '#23211C', bg2: '#15140F', fg: '#F0D78C', src: 'photos/img.jpeg' },
  { bg: '#15151A', bg2: '#0A0A0B', fg: '#EDEDED', src: 'photos/img2.jpeg' },
  { bg: '#2C2A24', bg2: '#1B1A16', fg: '#D4AF37', src: 'photos/img3.jpeg' },
  { bg: '#1A1D1C', bg2: '#0F1110', fg: '#EDEDED', src: 'photos/img4.jpeg' },
  { bg: '#201C18', bg2: '#120F0D', fg: '#A9824C', src: 'photos/img5.jpeg' },
  { bg: '#201C18', bg2: '#120F0D', fg: '#A9824C', src: 'photos/img6.jpeg' },
  { bg: '#201C18', bg2: '#120F0D', fg: '#A9824C', src: 'photos/img7.jpeg' },
  { bg: '#201C18', bg2: '#120F0D', fg: '#A9824C', src: 'photos/img8.jpeg' },
  { bg: '#201C18', bg2: '#120F0D', fg: '#A9824C', src: 'photos/img9.jpeg' },
  { bg: '#201C18', bg2: '#120F0D', fg: '#A9824C', src: 'photos/img10.jpeg' },
  { bg: '#201C18', bg2: '#120F0D', fg: '#A9824C', src: 'photos/img11.jpeg' },
  { bg: '#201C18', bg2: '#120F0D', fg: '#A9824C', src: 'photos/img12.jpeg' },
  { bg: '#201C18', bg2: '#120F0D', fg: '#A9824C', src: 'photos/img13.jpeg' },
  { bg: '#201C18', bg2: '#120F0D', fg: '#A9824C', src: 'photos/img14.jpeg' },
  { bg: '#201C18', bg2: '#120F0D', fg: '#A9824C', src: 'photos/img15.jpeg' },
  { bg: '#201C18', bg2: '#120F0D', fg: '#A9824C', src: 'photos/img16.jpeg' },
  { bg: '#201C18', bg2: '#120F0D', fg: '#A9824C', src: 'photos/img17.jpeg' },
  { bg: '#201C18', bg2: '#120F0D', fg: '#A9824C', src: 'photos/img18.jpeg' },
  { bg: '#201C18', bg2: '#120F0D', fg: '#A9824C', src: 'photos/img19.jpeg' },
  { bg: '#201C18', bg2: '#120F0D', fg: '#A9824C', src: 'photos/img20.jpeg' },
  { bg: '#201C18', bg2: '#120F0D', fg: '#A9824C', src: 'photos/img21.jpeg' },
  { bg: '#201C18', bg2: '#120F0D', fg: '#A9824C', src: 'photos/img22.jpeg' },
  { bg: '#201C18', bg2: '#120F0D', fg: '#A9824C', src: 'photos/img23.jpeg' },
];

// تعديل الدالة عشان ترجع مسار الصورة لو موجود، ولو مش موجود ترجع الـ SVG القديم عشان الموقع ميبوظش
function hImg(seed, w=700, h=900) {
  const index = typeof seed === 'number' ? seed % H_PALETTES.length : 0;
  const palette = H_PALETTES[index];
  
  // لو إحنا حاطين للـ palette دي صورة حقيقية، يرجعها فوراً
  if (palette && palette.src) {
    return palette.src;
  }
  
  // لو مفيش صورة، يرجع الـ SVG القديم كاحتياطي عشان ميعملش Error
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><rect width='100%' height='100%' fill='${palette.bg}'/></svg>`
  )}`;
}

const H_PRODUCT_NAMES = [
  ['Tailored Wool Overcoat','outerwear'], ['Waxed Field Jacket','outerwear'], ['Quilted Bomber','outerwear'],
  ['Oxford Dress Shirt','shirts'], ['Brushed Flannel Shirt','shirts'], ['Mercerized Cotton Shirt','shirts'],
  ['Merino Crewneck','knitwear'], ['Cable Knit Cardigan','knitwear'], ['Ribbed Half-Zip','knitwear'],
  ['Pleated Wool Trouser','trousers'], ['Tapered Chino','trousers'], ['Wide-Leg Trouser','trousers'],
  ['Raw Selvedge Denim','denim'], ['Slim Stretch Denim','denim'], ['Relaxed Straight Denim','denim'],
  ['Full-Grain Leather Belt','accessories'], ['Silk Pocket Square','accessories'], ['Structured Weekend Bag','accessories'],
  ['Double-Breasted Coat','outerwear'], ['Cashmere Turtleneck','knitwear'], ['Pressed Suit Jacket','trousers'],
  ['Heavyweight Henley','shirts'], ['Cropped Straight Denim','denim'], ['Leather Card Holder','accessories'],
];

const H_SIZES = ['S','M','L','XL','XXL'];

function hBuildProducts(){
  return H_PRODUCT_NAMES.map((p, i) => {
    const palette = H_PALETTES[i % H_PALETTES.length];
    const price = 120 + (i * 23) % 480;
    const onSale = i % 5 === 0;
    const rating = (3.7 + (i % 5) * 0.28).toFixed(1);
    const reviewCount = 6 + (i * 9) % 160;
    const sizes = H_SIZES.map((s, si) => ({ label: s, stock: (i + si) % 4 === 0 ? 0 : 3 + ((i+si)%8) }));
    const colorNames = Object.keys(H_COLORS);
    const colors = [colorNames[i % colorNames.length], colorNames[(i+2) % colorNames.length], colorNames[(i+4) % colorNames.length]]
      .filter((v,idx,arr)=>arr.indexOf(v)===idx)
      .map(name => ({ name, hex: H_COLORS[name] }));
    return {
      id: 'h' + (i+1),
      slug: p[0].toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: p[0],
      category: p[1],
      price: onSale ? Math.round(price * 0.75) : price,
      compareAt: onSale ? price : null,
      rating: parseFloat(rating),
      reviewCount,
      isNew: i % 6 === 1,
      isBestSeller: i % 7 === 2,
      colors,
      sizes,
      images: [`photos/img${(i % 5) + 2}.jpeg`],
      description: 'Cut from premium materials and finished by hand. A considered piece designed to anchor a wardrobe, not chase a season.',
    };
  });
}

const H_PRODUCTS = hBuildProducts();
function hGetBySlug(slug){ return H_PRODUCTS.find(p => p.slug === slug); }
function hGetById(id){ return H_PRODUCTS.find(p => p.id === id); }
function hGetRelated(p, n=4){ return H_PRODUCTS.filter(x => x.category === p.category && x.id !== p.id).slice(0,n); }

const H_REVIEWS = [
  { name: 'Omar F.', rating: 5, body: 'The overcoat is heavier and better made than anything I\'ve bought at this price point. Fits true to size.' },
  { name: 'James L.', rating: 5, body: 'Ordered the Oxford shirt in two colors after the first one arrived. The collar holds its shape all day.' },
  { name: 'Tariq H.', rating: 4, body: 'Excellent quality, slightly long in the sleeve for my arm length but tailoring sorted it in ten minutes.' },
  { name: 'Karim B.', rating: 5, body: '"name logo" has become my go-to for anything I need to look sharp in. Packaging alone feels premium.' },
];