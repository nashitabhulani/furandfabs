import { useEffect, useState } from 'react'
import './App.css'

import dogImage from '../assets/WhatsApp Image 2026-09-14 at 11.17.39 PM.jpeg'
import catGroupImage from '../assets/WhatsApp Image 2026-09-14 at 11.17.40 PM.jpeg'
import catImage from '../assets/WhatsApp Image 2026-09-14 at 11.18.17 PM.jpeg'
import powderImage from '../assets/WhatsApp Image 2026-09-14 at 11.24.07 PM.jpeg'

const slides = [
  
  { image: dogImage, alt: 'Dog shaped Fur and Fab fabric wash bottle', caption: 'Gentle on fabrics' },
  { image: catGroupImage, alt: 'Cat shaped Fur and Fab bottles', caption: 'Made for every pet home' },
  { image: catImage, alt: 'Close-up of the cat shaped fabric wash bottle', caption: 'Plant based care' },
  { image: powderImage, alt: 'Fur and Fab powder detergent and lid', caption: 'Freshness, from the first wash' },
]

const productInfo = [
  ['Product Benefits', 'Plant-based cleaning power that is gentle on paws, lifts everyday stains, and helps keep fabric fresh.'],
  ['How To Use', 'Add one scoop to your wash with pet bedding, blankets, toys, or any washable fabric.'],
  ['Ingredients', 'Plant-derived cleaning agents, mineral brighteners, and a soft, pet-friendly fragrance.'],
  ['Shipping & Returns', 'Free shipping on orders over Rs 999. Unopened products can be returned within 14 days.'],
]

function Icon({ name }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 5 5" /></>,
    user: <><circle cx="12" cy="8" r="3.5" /><path d="M5 21a7 7 0 0 1 14 0" /></>,
    cart: <><path d="M3 4h2l2.1 11.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L20 8H6" /><circle cx="10" cy="20" r="1" /><circle cx="18" cy="20" r="1" /></>,
    paw: <><path d="M8.2 10.7c-1.9.3-3.8-.9-3.9-2.8-.1-1.6 1-2.8 2.3-2.9 1.5-.1 2.5 1.2 2.8 2.7M15.8 10.7c1.9.3 3.8-.9 3.9-2.8.1-1.6-1-2.8-2.3-2.9-1.5-.1-2.5 1.2-2.8 2.7M9.4 13.5c-1.3-1.2-3.7-.9-4.4.9-.7 1.8.6 3.2 2.3 3.2 1.3 0 2.1-.7 2.7-.7s1.4.7 2 .7c.6 0 1.4-.7 2-.7s1.4.7 2.7.7c1.7 0 3-1.4 2.3-3.2-.7-1.8-3.1-2.1-4.4-.9-1.1 1-2.9 1-4 0Z" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  }
  return <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function App() {
  const [page, setPage] = useState(() => window.location.hash === '#about' ? 'about' : 'shop')
  const [size, setSize] = useState('1 kg')
  const [quantity, setQuantity] = useState(1)
  const [cartCount, setCartCount] = useState(0)
  const [subscribed, setSubscribed] = useState(false)
  const [openPanel, setOpenPanel] = useState(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  useEffect(() => {
    const timer = window.setInterval(() => setActiveSlide((slide) => (slide + 1) % slides.length), 5000)
    const handleHashChange = () => setPage(window.location.hash === '#about' ? 'about' : 'shop')
    window.addEventListener('hashchange', handleHashChange)
    return () => {
      window.clearInterval(timer)
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  return (
    <main className="storefront">
      <div className="offer-bar"><Icon name="paw" /> Limited Time Offer: Get 10% off on your first order! <Icon name="paw" /></div>
      <header className="site-header">
        <nav className="nav-links" aria-label="Main navigation"><a href="#shop">Shop</a><a href="#about">About</a><a href="#find-us">Find Us</a></nav>
        <a className="logo-link" href="#shop" aria-label="Fur and Fab home"><img src="/fur-fab-logo.png" alt="Fur and Fab" /></a>
        <div className="header-actions"><a href="#influencers">Petfluencers</a><button aria-label="Search"><Icon name="search" /></button><button aria-label="Account"><Icon name="user" /></button><button className="cart-button" aria-label="Shopping cart"><Icon name="cart" /><span>{cartCount}</span></button></div>
      </header>

      {page === 'shop' ? <>
      <section className="product-layout" id="shop">
        <div className="product-visual" aria-label="Product image carousel">
          {slides.map((slide, index) => <img key={slide.image} className={`slide-image ${index === activeSlide ? 'is-active' : ''}`} src={slide.image} alt={slide.alt} />)}
          <div className="visual-copy">{slides[activeSlide].caption}<span>♡</span></div>
          <button className="carousel-arrow previous" onClick={() => setActiveSlide((activeSlide - 1 + slides.length) % slides.length)} aria-label="Previous product image">‹</button>
          <button className="carousel-arrow next" onClick={() => setActiveSlide((activeSlide + 1) % slides.length)} aria-label="Next product image">›</button>
          <div className="dots" aria-label="Product images">{slides.map((slide, index) => <button key={slide.alt} className={index === activeSlide ? 'active' : ''} onClick={() => setActiveSlide(index)} aria-label={`Image ${index + 1}`} />)}</div>
        </div>

        <div className="product-details">
          <p className="eyebrow">FUR & FAB</p><h1>Pet Laundry Detergent</h1><h2>For Dogs & Cats</h2><p className="tagline">Gentle. Effective. Plant Based.</p>
          <div className="packaging-claims"><span><strong>15-day</strong> pet odour protection</span><span><strong>1 kg</strong> | 50 washes</span><span><strong>Biodegradable</strong> packaging</span></div>
          <div className="price-row"><del>₹499</del><strong>₹449</strong><span className="rating">★★★★★</span><a href="#reviews">(235 Reviews)</a></div>
          <p className="description">A plant based fabric wash specially formulated for pet bedding, blankets, toys and everyday fabrics. Removes tough odour, keeps fabrics fresh and gentle for your furry friends.</p>
          <div className="selectors"><div><label>Size</label><div className="size-options">{['500 g', '1 kg', '2 kg'].map((option) => <button key={option} className={size === option ? 'selected' : ''} onClick={() => setSize(option)}>{option}</button>)}</div></div><div><label>Quantity</label><div className="quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">−</button><span>{quantity}</span><button onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity">+</button></div></div></div>
          <button className="add-button" onClick={() => setCartCount(cartCount + quantity)}><Icon name="cart" /> {cartCount ? 'ADDED TO CART' : 'ADD TO CART'}</button>
          <label className="subscribe"><input type="checkbox" checked={subscribed} onChange={(event) => setSubscribed(event.target.checked)} /><span className="checkbox" /><span><b>Subscribe & Save 10%</b><small>Get regular deliveries and never run out!</small></span></label>
          <div className="accordions">{productInfo.map(([title, copy], index) => <div className={`accordion ${openPanel === index ? 'is-open' : ''}`} key={title}><button onClick={() => setOpenPanel(openPanel === index ? null : index)} aria-expanded={openPanel === index}><span>{title}</span><b>+</b></button>{openPanel === index && <p>{copy}</p>}</div>)}</div>
        </div>
      </section>

      <section className="benefits"><div><strong>Plant based</strong><span>Kind to paws and planet</span></div><div><strong>Pet safe</strong><span>Made for daily use</span></div><div><strong>Odour care</strong><span>Fresh fabrics, naturally</span></div><div><strong>Free delivery</strong><span>On orders over ₹999</span></div></section>
      </> : <section className="about-page" id="about">
        <div className="about-hero"><p className="eyebrow">THE FUR&FAB PROMISE</p><h1>Everything that comforts your pet deserves a different kind of clean.</h1><p>For everything they wear, sleep on and cuddle.</p><a className="about-cta" href="#shop">Shop pet fabric wash <Icon name="arrow" /></a></div>
        <div className="about-intro"><div><p className="eyebrow">WHY WE EXIST</p><h2>Because clean is part of care.</h2></div><p>You think about what goes in their bowl. You think about what touches their skin. You think about what they sleep on and what they cuddle. Fur&Fab brings that same care to the fabrics closest to them, with a specialist clean made for pet life.</p></div>
        <div className="about-grid"><article className="usp-card"><span className="about-number">01</span><strong className="usp-stat">15 days</strong><h3>Pet odour protection</h3><p>Long-lasting freshness for the fabrics that stay closest to your pet.</p></article><article className="usp-card"><span className="about-number">02</span><strong className="usp-stat">50 washes</strong><h3>From one 1 kg pack</h3><p>A specialist clean made for their everyday clothes, beds, blankets and toys.</p></article><article className="usp-card"><span className="about-number">03</span><strong className="usp-stat">Biodegradable</strong><h3>Packaging</h3><p>Thoughtful care for your home, your pet and the world they explore together.</p></article></div>
        <div className="about-feature"><img src={dogImage} alt="Fur and Fab dog shaped fabric wash bottle" /><div><p className="eyebrow">SPECIALIST BY DESIGN</p><h2>Clean the things that make them feel at home.</h2><p>Fur&Fab is a specialist fabric care ritual for the places, layers and little things your pet returns to every day. Thoughtful for your home. Gentle around your furry family.</p><a className="about-cta" href="#shop">Find your clean <Icon name="arrow" /></a></div></div>
      </section>}
      <footer className="site-footer" id="find-us">
        <div className="footer-brand"><img src="/fur-fab-logo.png" alt="Fur and Fab" /><p>Cleaner fabrics. Happier pets.</p><div className="social-links"><a href="#instagram">Instagram</a><a href="#facebook">Facebook</a></div></div>
        <div><h3>Explore</h3><a href="#shop">Shop</a><a href="#about">Our story</a><a href="#influencers">Petfluencers</a></div>
        <div><h3>Help</h3><a href="#contact">Contact us</a><a href="#shipping">Shipping & returns</a><a href="#faq">FAQs</a></div>
        <div className="newsletter"><h3>Stay in the pack</h3><p>Get pet care tips and 10% off your first order.</p><form onSubmit={(event) => { event.preventDefault(); setJoined(true) }}><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email address" required aria-label="Email address" /><button aria-label="Subscribe"><Icon name="arrow" /></button></form>{joined && <small>You're on the list. Welcome to the pack!</small>}</div>
        <div className="footer-bottom"><span>© 2026 Fur&Fab. All rights reserved.</span><span>Made for the messes that make memories.</span></div>
      </footer>
    </main>
  )
}

export default App
