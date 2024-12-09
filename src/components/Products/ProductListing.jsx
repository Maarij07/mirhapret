import React, { useState } from 'react';
import ProductCard from './ProductCard'; // Reusable Product Card Component
import { FiSearch } from 'react-icons/fi';

const ProductListing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const products = [
    {
      id: 1,
      name: "Classic Western Jacket",
      price: "PKR 1200",
      images: [
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418577/img-1.1_xt6jsh.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418577/img-1.2_xewhft.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418576/img-1.6_lvxjaj.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418570/img-1.5_mrysyu.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418570/img-1.7_uek68s.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418570/img-1.3_r9pqjm.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418569/img-1.4_lctcde.jpg"
      ],
      description: `A versatile western-style jacket made from premium cotton fabric. Perfect for casual or semi-formal outings, this jacket will add a rugged touch to your wardrobe.
  
  Fit: Regular fit with a slightly tailored waist
  
  Fabric Composition: 100% Cotton
  
  Material: Cotton
  
  Lining: Yes
  
  Model Specs: Wearing size M; height 5'9"
  
  Care Instructions: Machine wash cold; tumble dry low.
  
  Disclaimer: Colors may slightly vary due to lighting conditions and screen display settings.`,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Rust Brown", "Charcoal", "Beige"],
      material: "Cotton",
      quantity: 45,
    },
    {
      id: 2,
      name: "Elegant Silk Dress",
      price: "PKR 950",
      images: [
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418581/img-2.6_j1sibc.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418581/img-2.7_zwzcni.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418581/img-2.5_igbjud.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418581/img-2.4_clct86.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418581/img-2.8_vqt47r.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418580/img-2.1_ozignm.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418580/img-2.3_phgo7x.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418578/img-2.2_wecwmq.jpg"
      ],
      description: `This elegant silk dress exudes timeless beauty and sophistication. The sleek fabric flows gracefully, offering a figure-flattering silhouette that is perfect for special occasions or a night out.
  
  Fit: A-line silhouette with a slim fit waist
  
  Fabric Composition: 100% Silk
  
  Material: Silk
  
  Lining: Yes
  
  Model Specs: Wearing size S; height 5'8"
  
  Care Instructions: Dry clean only; avoid direct sunlight when storing.
  
  Disclaimer: Colors may slightly vary due to lighting conditions and screen display settings.`,
      sizes: ["XS", "S", "M", "L"],
      colors: ["Ivory", "Crimson Red", "Emerald Green"],
      material: "Silk",
      quantity: 30,
    },
    {
      id: 3,
      name: "Trendy Casual Shoes",
      price: "PKR 800",
      images: [
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418568/img-3.9_c93pn5.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418569/img-3.3_qfycze.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418570/img-3.4_x5gw8l.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418569/img-3.2_tqsmgq.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418576/img-3.10_r88dmm.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418569/img-3.6_hzi61m.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418569/img-3.7_m8s4ge.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418577/img-3.1_slwpyi.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418568/img-3.5_vo7u5d.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418569/img-3.8_wxrh7v.jpg"
      ],
      description: `The Trendy Casual Shoes are designed for comfort and style. Perfect for daily wear, they feature a breathable mesh upper and cushioned insole for long-lasting comfort. These shoes are a versatile addition to any wardrobe.
  
  Fit: Regular fit, true to size
  
  Fabric Composition: Synthetic Mesh
  
  Material: Mesh, Rubber Sole
  
  Lining: Yes
  
  Model Specs: Wearing size 8; height 5'9"
  
  Care Instructions: Wipe with a damp cloth; air dry only.
  
  Disclaimer: Colors may slightly vary due to lighting conditions and screen display settings.`,
      sizes: ["6", "7", "8", "9", "10"],
      colors: ["Black", "White", "Navy Blue"],
      material: "Mesh",
      quantity: 100,
    },
    {
      id: 4,
      name: "Luxury Handbag",
      price: "PKR 2000",
      images: [
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418568/img-4.4_fascoc.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418568/img-4.2_sbitwd.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418568/img-4.1_r5usj7.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418567/img-4.5_o0x0ah.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418567/img-4.3_qtgnw0.jpg"

      ],
      description: `This luxury handbag is crafted with precision and care, offering both elegance and durability. The rich leather texture and sleek design make it the perfect accessory for any occasion.
  
  Fit: One size, spacious interior with multiple compartments
  
  Fabric Composition: Genuine Leather
  
  Material: Leather, Gold Hardware
  
  Lining: Yes
  
  Model Specs: Height 5'6"
  
  Care Instructions: Clean with a dry cloth; store in a dust bag to preserve quality.
  
  Disclaimer: Colors may slightly vary due to lighting conditions and screen display settings.`,
      sizes: ["One Size"],
      colors: ["Tan", "Black", "Burgundy"],
      material: "Leather",
      quantity: 25,
    },
    {
      id: 5,
      name: "Summer Beachwear",
      price: "PKR 600",
      images: [
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418571/img-5.7_kevpng.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418577/img-5.5_gkwq6d.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418577/img-5.1_st5jwo.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418569/img-5.4_nsaure.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418576/img-5.9_hj0mnh.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418576/img-5.6_xgptfg.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418571/img-5.3_wjpfqn.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418570/img-5.2_whlxet.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418577/img-5.8_ngd9bn.jpg"
      ],
      description: `This lightweight beachwear set is designed for a relaxed day by the ocean. The breathable fabric and loose fit make it ideal for hot summer days, offering both style and comfort.
  
  Fit: Relaxed fit, perfect for lounging
  
  Fabric Composition: 100% Cotton
  
  Material: Cotton, Breathable Fabric
  
  Lining: No
  
  Model Specs: Wearing size M; height 5'6"
  
  Care Instructions: Hand wash cold, tumble dry low.
  
  Disclaimer: Colors may slightly vary due to lighting conditions and screen display settings.`,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Sky Blue", "Sunset Orange", "Crisp White"],
      material: "Cotton",
      quantity: 75,
    },
    {
      id: 6,
      name: "Denim Blue Jacket",
      price: "PKR 1100",
      images: [
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418567/img-6.5_nlsqng.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418568/img-6.9_m4nnfx.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418567/img-6.4_zgt2ll.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418567/img-6.7_ljaill.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418568/img-6.6_pqxtry.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418576/img-6.8_gcpfas.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418576/img-6.2_ptvqyl.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418568/img-6.10_whqzd7.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418568/img-6.12_g11q5x.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418567/img-6.1_uauckx.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418567/img-6.3_opyeel.jpg",
        "https://res.cloudinary.com/dsdc5lm0j/image/upload/v1733418568/img-6.11_os1d9y.jpg"
      ],
      description: `The Denim Blue Jacket is a timeless wardrobe staple. With a classic cut and high-quality denim fabric, this jacket adds an effortless cool factor to any outfit.
  
  Fit: Regular fit, slightly tailored for a neat appearance
  
  Fabric Composition: 100% Denim Cotton
  
  Material: Denim
  
  Lining: Yes
  
  Model Specs: Wearing size M; height 5'9"
  
  Care Instructions: Machine wash cold; tumble dry low.
  
  Disclaimer: Colors may slightly vary due to lighting conditions and screen display settings.`,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Denim Blue", "Light Wash"],
      material: "Denim",
      quantity: 40,
    },
    {
      id: 7,
      name: "Cozy Knit Sweater",
      price: "PKR 850",
      images: [
        "https://via.placeholder.com/300x400",
        "https://via.placeholder.com/300x400?text=Side+View",
        "https://via.placeholder.com/300x400?text=Back+View"
      ],
      description: `The Cozy Knit Sweater is your go-to piece for chilly days. Crafted from soft, breathable yarns, this sweater offers warmth without compromising style. Perfect for layering or wearing on its own.
  
  Fit: Relaxed fit, with ribbed detailing at cuffs and hem
  
  Fabric Composition: 80% Wool, 20% Acrylic
  
  Material: Knit, Wool Blend
  
  Lining: No
  
  Model Specs: Wearing size S; height 5'7"
  
  Care Instructions: Hand wash cold; lay flat to dry.
  
  Disclaimer: Colors may slightly vary due to lighting conditions and screen display settings.`,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Charcoal Grey", "Beige", "Soft Pink"],
      material: "Wool Blend",
      quantity: 60,
    },
    {
      id: 8,
      name: "Chic Leather Boots",
      price: "PKR 1500",
      images: [
        "https://via.placeholder.com/300x400",
        "https://via.placeholder.com/300x400?text=Side+View",
        "https://via.placeholder.com/300x400?text=Back+View"
      ],
      description: `These chic leather boots are the perfect addition to your fall wardrobe. Made from high-quality leather, they offer both durability and style, making them ideal for day-to-day wear.
  
  Fit: Regular fit with a zipper closure
  
  Fabric Composition: Genuine Leather
  
  Material: Leather, Rubber Sole
  
  Lining: Yes
  
  Model Specs: Wearing size 8; height 5'8"
  
  Care Instructions: Clean with a leather conditioner; store in a cool dry place.
  
  Disclaimer: Colors may slightly vary due to lighting conditions and screen display settings.`,
      sizes: ["6", "7", "8", "9", "10"],
      colors: ["Black", "Brown", "Tan"],
      material: "Leather",
      quantity: 40,
    },
    {
      id: 9,
      name: "Floral Print Skirt",
      price: "PKR 450",
      images: [
        "https://via.placeholder.com/300x400",
        "https://via.placeholder.com/300x400?text=Side+View",
        "https://via.placeholder.com/300x400?text=Back+View"
      ],
      description: `This Floral Print Skirt is perfect for spring and summer. With a flattering fit and vibrant floral pattern, it adds a fun and feminine touch to any outfit.
  
  Fit: A-line skirt with an elastic waistband for comfort
  
  Fabric Composition: 100% Polyester
  
  Material: Polyester
  
  Lining: Yes
  
  Model Specs: Wearing size S; height 5'6"
  
  Care Instructions: Machine wash cold; tumble dry low.
  
  Disclaimer: Colors may slightly vary due to lighting conditions and screen display settings.`,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Floral Print", "Black", "White"],
      material: "Polyester",
      quantity: 90,
    },
    {
      id: 10,
      name: "Formal Tuxedo Set",
      price: "PKR 2500",
      images: [
        "https://via.placeholder.com/300x400",
        "https://via.placeholder.com/300x400?text=Side+View",
        "https://via.placeholder.com/300x400?text=Back+View"
      ],
      description: `The Formal Tuxedo Set is a classic choice for elegant events. With a tailored cut, satin lapels, and a crisp finish, this tuxedo ensures you look sharp at any formal occasion.
  
  Fit: Slim fit with a single-breasted design
  
  Fabric Composition: Wool Blend
  
  Material: Wool, Satin
  
  Lining: Yes
  
  Model Specs: Wearing size M; height 6'0"
  
  Care Instructions: Dry clean only.
  
  Disclaimer: Colors may slightly vary due to lighting conditions and screen display settings.`,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "Navy Blue"],
      material: "Wool Blend",
      quantity: 20,
    },
    {
      id: 11,
      name: "Stylish Backpack",
      price: "PKR 750",
      images: [
        "https://via.placeholder.com/300x400",
        "https://via.placeholder.com/300x400?text=Side+View",
        "https://via.placeholder.com/300x400?text=Back+View"
      ],
      description: `A stylish yet functional backpack made from durable material. Perfect for both work and casual outings, this bag features multiple compartments to store your essentials.
  
  Fit: One size with adjustable straps
  
  Fabric Composition: Nylon
  
  Material: Nylon, Polyester
  
  Lining: Yes
  
  Model Specs: Height 5'7"
  
  Care Instructions: Spot clean with a damp cloth.
  
  Disclaimer: Colors may slightly vary due to lighting conditions and screen display settings.`,
      sizes: ["One Size"],
      colors: ["Black", "Grey", "Olive Green"],
      material: "Nylon",
      quantity: 50,
    },
    {
      id: 12,
      name: "Luxe Cashmere Scarf",
      price: "PKR 1300",
      images: [
        "https://via.placeholder.com/300x400",
        "https://via.placeholder.com/300x400?text=Side+View",
        "https://via.placeholder.com/300x400?text=Back+View"
      ],
      description: `This Luxe Cashmere Scarf adds a touch of sophistication to your winter wardrobe. Soft, warm, and elegant, it’s perfect for layering over your coat or jacket.
  
  Fit: One size
  
  Fabric Composition: 100% Cashmere
  
  Material: Cashmere
  
  Lining: No
  
  Model Specs: Height 5'6"
  
  Care Instructions: Hand wash cold; lay flat to dry.
  
  Disclaimer: Colors may slightly vary due to lighting conditions and screen display settings.`,
      sizes: ["One Size"],
      colors: ["Charcoal", "Ivory", "Burgundy"],
      material: "Cashmere",
      quantity: 35,
    },
    {
      id: 13,
      name: "Winter Puffer Jacket",
      price: "PKR 1600",
      images: [
        "https://via.placeholder.com/300x400",
        "https://via.placeholder.com/300x400?text=Side+View",
        "https://via.placeholder.com/300x400?text=Back+View"
      ],
      description: `This Winter Puffer Jacket is the perfect blend of warmth and style. With high-quality insulation and a water-resistant finish, it will keep you cozy during cold weather.
  
  Fit: Relaxed fit with adjustable cuffs and hood
  
  Fabric Composition: 100% Nylon
  
  Material: Nylon, Polyester
  
  Lining: Yes
  
  Model Specs: Wearing size M; height 5'9"
  
  Care Instructions: Machine wash cold; tumble dry low.
  
  Disclaimer: Colors may slightly vary due to lighting conditions and screen display settings.`,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "Navy Blue", "Red"],
      material: "Nylon",
      quantity: 30,
    },
    {
      id: 14,
      name: "Bohemian Beach Hat",
      price: "PKR 250",
      images: [
        "https://via.placeholder.com/300x400",
        "https://via.placeholder.com/300x400?text=Side+View",
        "https://via.placeholder.com/300x400?text=Back+View"
      ],
      description: `This Bohemian Beach Hat is perfect for sunny days by the ocean. Made from lightweight material, it provides sun protection while adding a boho chic vibe to your look.
  
  Fit: One size with adjustable inner band
  
  Fabric Composition: Straw
  
  Material: Straw, Cotton
  
  Lining: No
  
  Model Specs: Height 5'7"
  
  Care Instructions: Spot clean; store in a cool dry place.
  
  Disclaimer: Colors may slightly vary due to lighting conditions and screen display settings.`,
      sizes: ["One Size"],
      colors: ["Natural Straw", "White", "Black"],
      material: "Straw",
      quantity: 100,
    },
    {
      id: 15,
      name: "Comfortable Jogging Pants",
      price: "PKR 550",
      images: [
        "https://via.placeholder.com/300x400",
        "https://via.placeholder.com/300x400?text=Side+View",
        "https://via.placeholder.com/300x400?text=Back+View"
      ],
      description: `These Comfortable Jogging Pants are designed for a relaxed fit and maximum comfort. Ideal for lounging, workouts, or casual outings, they feature a drawstring waist for easy adjustments.
  
  Fit: Relaxed fit with a drawstring waist
  
  Fabric Composition: 80% Cotton, 20% Polyester
  
  Material: Cotton Blend
  
  Lining: No
  
  Model Specs: Wearing size M; height 5'8"
  
  Care Instructions: Machine wash cold; tumble dry low.
  
  Disclaimer: Colors may slightly vary due to lighting conditions and screen display settings.`,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "Grey", "Navy Blue"],
      material: "Cotton Blend",
      quantity: 50,
    },
    {
      id: 16,
      name: "Sleek Business Suit",
      price: "PKR 2200",
      images: [
        "https://via.placeholder.com/300x400",
        "https://via.placeholder.com/300x400?text=Side+View",
        "https://via.placeholder.com/300x400?text=Back+View"
      ],
      description: `This Sleek Business Suit combines modern tailoring with a classic silhouette. Perfect for professional settings, it offers a sharp, polished look.
  
  Fit: Slim fit with a single-breasted design
  
  Fabric Composition: Wool Blend
  
  Material: Wool, Polyester
  
  Lining: Yes
  
  Model Specs: Wearing size M; height 6'0"
  
  Care Instructions: Dry clean only.
  
  Disclaimer: Colors may slightly vary due to lighting conditions and screen display settings.`,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "Navy Blue"],
      material: "Wool Blend",
      quantity: 15,
    },
    {
      id: 17,
      name: "Cozy Slippers",
      price: "PKR 350",
      images: [
        "https://via.placeholder.com/300x400",
        "https://via.placeholder.com/300x400?text=Side+View",
        "https://via.placeholder.com/300x400?text=Back+View"
      ],
      description: `These Cozy Slippers are perfect for wearing around the house. Made from soft fleece, they offer ultimate warmth and comfort during colder months.
  
  Fit: One size
  
  Fabric Composition: Fleece
  
  Material: Fleece, Rubber Sole
  
  Lining: Yes
  
  Model Specs: Wearing size 6; height 5'5"
  
  Care Instructions: Hand wash cold; air dry.
  
  Disclaimer: Colors may slightly vary due to lighting conditions and screen display settings.`,
      sizes: ["One Size"],
      colors: ["Pink", "Grey", "Blue"],
      material: "Fleece",
      quantity: 100,
    },
    {
      id: 18,
      name: "Vintage Sunglasses",
      price: "PKR 500",
      images: [
        "https://via.placeholder.com/300x400",
        "https://via.placeholder.com/300x400?text=Side+View",
        "https://via.placeholder.com/300x400?text=Back+View"
      ],
      description: `These Vintage Sunglasses are the perfect accessory for sunny days. With classic round frames and a stylish design, they’ll complement any outfit.
  
  Fit: One size, fits most face shapes
  
  Fabric Composition: Acetate Frame, UV Protected Lenses
  
  Material: Acetate, Plastic Lenses
  
  Lining: No
  
  Model Specs: Height 5'8"
  
  Care Instructions: Clean with a soft cloth; avoid dropping.
  
  Disclaimer: Colors may slightly vary due to lighting conditions and screen display settings.`,
      sizes: ["One Size"],
      colors: ["Black", "Tortoise Shell", "Gold"],
      material: "Acetate",
      quantity: 120,
    },
    {
      id: 19,
      name: "Premium Wool Coat",
      price: "PKR 1800",
      images: [
        "https://via.placeholder.com/300x400",
        "https://via.placeholder.com/300x400?text=Side+View",
        "https://via.placeholder.com/300x400?text=Back+View"
      ],
      description: `This Premium Wool Coat is perfect for cold weather. The high-quality wool construction ensures warmth while the tailored fit offers a sophisticated look.
  
  Fit: Regular fit, knee-length
  
  Fabric Composition: 80% Wool, 20% Nylon
  
  Material: Wool Blend
  
  Lining: Yes
  
  Model Specs: Wearing size M; height 5'9"
  
  Care Instructions: Dry clean only.
  
  Disclaimer: Colors may slightly vary due to lighting conditions and screen display settings.`,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Camel", "Black", "Charcoal"],
      material: "Wool Blend",
      quantity: 25,
    },
    {
      id: 20,
      name: "Handcrafted Leather Wallet",
      price: "PKR 400",
      images: [
        "https://via.placeholder.com/300x400",
        "https://via.placeholder.com/300x400?text=Side+View",
        "https://via.placeholder.com/300x400?text=Back+View"
      ],
      description: `This Handcrafted Leather Wallet combines classic style with functionality. With multiple card slots and a slim profile, it’s the ideal accessory for everyday use.
  
  Fit: One size, slim profile
  
  Fabric Composition: Genuine Leather
  
  Material: Leather
  
  Lining: No
  
  Model Specs: Height 5'10"
  
  Care Instructions: Clean with a dry cloth; store in a cool dry place.
  
  Disclaimer: Colors may slightly vary due to lighting conditions and screen display settings.`,
      sizes: ["One Size"],
      colors: ["Black", "Brown"],
      material: "Leather",
      quantity: 75,
    },
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 py-8">
      {/* Product Header */}
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-4">
          <img src="https://via.placeholder.com/1200x500" alt="" />
        </div>

        {/* Search Bar */}
        {/* <div className="flex justify-center mb-8">
          <div className="relative w-1/2 md:w-1/4">
            <input
              type="text"
              placeholder="Search for products"
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
          </div>
        </div> */}

        {/* Product Grid */}
        <div className="grid grid-cols-1 bg-[#F5F5F5] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
