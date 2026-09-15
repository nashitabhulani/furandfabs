import { useEffect, useState } from 'react'
import './App.css'

import dogImage from '../assets/WhatsApp Image 2026-09-14 at 11.17.39 PM.jpeg'
import catGroupImage from '../assets/WhatsApp Image 2026-09-14 at 11.17.40 PM.jpeg'
import catImage from '../assets/WhatsApp Image 2026-09-14 at 11.18.17 PM.jpeg'
import powderImage from '../assets/WhatsApp Image 2026-09-14 at 11.24.07 PM.jpeg';
import cocoImage from '../assets/coco.jpg';
import mikoImage from '../assets/miko.jpg';

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
  const getPageFromHash = () => {
    const hash = window.location.hash.replace('#', '')
    if (['about', 'petfluencers', 'influencers', 'customise'].includes(hash)) {
      return hash === 'influencers' ? 'petfluencers' : hash
    }
    return 'shop'
  }

  const [page, setPage] = useState(getPageFromHash)
  const [size, setSize] = useState('1 kg')
  const [quantity, setQuantity] = useState(1)
  const [cartCount, setCartCount] = useState(0)
  const [subscribed, setSubscribed] = useState(false)
  const [openPanel, setOpenPanel] = useState(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Petfluencers modal/detail state
  const [selectedPet, setSelectedPet] = useState(null)

  // Customise form state
  const [customiseForm, setCustomiseForm] = useState({
    petName: '',
    petType: 'Dog',
    breed: '',
    issues: '',
    ownerEmail: '',
    phone: ''
  })
  const [customiseSubmitted, setCustomiseSubmitted] = useState(false)

  useEffect(() => {
    const timer = window.setInterval(() => setActiveSlide((slide) => (slide + 1) % slides.length), 5000)
    const handleHashChange = () => {
      setPage(getPageFromHash())
      setMobileMenuOpen(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => {
      window.clearInterval(timer)
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const handleCustomiseSubmit = (e) => {
    e.preventDefault()
    setCustomiseSubmitted(true)
  }

  return (
    <main className="storefront">
      <div className="container">
        <div className="offer-bar"><Icon name="paw" /> Limited Time Offer: Get 10% off on your first order! <Icon name="paw" /></div>
        <header className="site-header">
          <button className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle navigation menu">☰</button>
          
          <nav className={`nav-links left-nav ${mobileMenuOpen ? 'mobile-nav-open' : ''}`} aria-label="Main navigation">
            <a href="#shop" className={page === 'shop' ? 'active-nav' : ''}>Shop</a>
            <a href="#about" className={page === 'about' ? 'active-nav' : ''}>About</a>
            <a href="#find-us">Find Us</a>
            {/* Mobile menu includes right nav links when open */}
            {mobileMenuOpen && (
              <>
                <a href="#petfluencers" className={page === 'petfluencers' ? 'active-nav' : ''}>Petfluencers</a>
                <a href="#customise" className={page === 'customise' ? 'active-nav' : ''}>Customise</a>
              </>
            )}
          </nav>

          <a className="logo-link" href="#shop" aria-label="Fur and Fab home"><img src="/fur-fab-logo.png" alt="Fur and Fab" /></a>

          <div className="header-actions">
            <nav className="nav-links right-nav">
              <a href="#petfluencers" className={page === 'petfluencers' ? 'active-nav' : ''}>Petfluencers</a>
              <a href="#customise" className={page === 'customise' ? 'active-nav' : ''}>Customise</a>
            </nav>
            <div className="action-buttons">
              <button aria-label="Search"><Icon name="search" /></button>
              <button aria-label="Account"><Icon name="user" /></button>
              <button className="cart-button" aria-label="Shopping cart" onClick={() => setCartCount(cartCount + 1)}><Icon name="cart" /><span>{cartCount}</span></button>
            </div>
          </div>
        </header>

        {page === 'shop' && (
          <>
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

                <div className="price-row"><del>₹499</del><strong>₹449</strong><span className="rating">★★★★★</span><a href="#reviews">(235 Reviews)</a></div>
                <p className="description">A plant based fabric wash specially formulated for pet bedding, blankets, toys and everyday fabrics. Removes tough odour, keeps fabrics fresh and gentle for your furry friends.</p>
                <div className="selectors"><div><label>Size</label><div className="size-options">{['500 g', '1 kg', '2 kg'].map((option) => <button key={option} className={size === option ? 'selected' : ''} onClick={() => setSize(option)}>{option}</button>)}</div></div><div><label>Quantity</label><div className="quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">−</button><span>{quantity}</span><button onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity">+</button></div></div></div>
                <button className="add-button" onClick={() => setCartCount(cartCount + quantity)}><Icon name="cart" /> {cartCount ? 'ADDED TO CART' : 'ADD TO CART'}</button>
                <label className="subscribe"><input type="checkbox" checked={subscribed} onChange={(event) => setSubscribed(event.target.checked)} /><span className="checkbox" /><span><b>Subscribe & Save 10%</b><small>Get regular deliveries and never run out!</small></span></label>
                <div className="accordions">{productInfo.map(([title, copy], index) => <div className={`accordion ${openPanel === index ? 'is-open' : ''}`} key={title}><button onClick={() => setOpenPanel(openPanel === index ? null : index)} aria-expanded={openPanel === index}><span>{title}</span><b>+</b></button>{openPanel === index && <p>{copy}</p>}</div>)}</div>
              </div>
            </section>

            <section className="benefits"><div><strong>Plant based</strong><span>Kind to paws and planet</span></div><div><strong>Pet safe</strong><span>Made for daily use</span></div><div><strong>Odour care</strong><span>Fresh fabrics, naturally</span></div><div><strong>Free delivery</strong><span>On orders over ₹999</span></div></section>
          </>
        )}

        {page === 'about' && (
          <section className="about-page" id="about">
            <div className="about-hero"><p className="eyebrow">THE FUR&FAB PROMISE</p><h1>Everything that comforts your pet deserves a different kind of clean.</h1><p>For everything they wear, sleep on and cuddle.</p><a className="about-cta" href="#shop">Shop pet fabric wash <Icon name="arrow" /></a></div>
            <div className="about-intro"><div><p className="eyebrow">WHY WE EXIST</p><h2>Because clean is part of care.</h2></div><p>You think about what goes in their bowl. You think about what touches their skin. You think about what they sleep on and what they cuddle. Fur&Fab brings that same care to the fabrics closest to them, with a specialist clean made for pet life.</p></div>
            <div className="about-grid"><article className="usp-card"><span className="about-number">01</span><strong className="usp-stat">15 days</strong><h3>Pet odour protection</h3><p>Long-lasting freshness for the fabrics that stay closest to your pet.</p></article><article className="usp-card"><span className="about-number">02</span><strong className="usp-stat">50 washes</strong><h3>From one 1 kg pack</h3><p>A specialist clean made for their everyday clothes, beds, blankets and toys.</p></article><article className="usp-card"><span className="about-number">03</span><strong className="usp-stat">Biodegradable</strong><h3>Packaging</h3><p>Thoughtful care for your home, your pet and the world they explore together.</p></article></div>
            <div className="about-feature"><img src={dogImage} alt="Fur and Fab dog shaped fabric wash bottle" /><div><p className="eyebrow">SPECIALIST BY DESIGN</p><h2>Clean the things that make them feel at home.</h2><p>Fur&Fab is a specialist fabric care ritual for the places, layers and little things your pet returns to every day. Thoughtful for your home. Gentle around your furry family.</p><a className="about-cta" href="#shop">Find your clean <Icon name="arrow" /></a></div></div>
          </section>
        )}

        {page === 'petfluencers' && (
          <section className="petfluencers-page" id="petfluencers">
            <div className="petfluencers-hero">
              <p className="eyebrow">OUR STARS</p>
              <h1>Meet Our Petfluencers</h1>
              <p>Discover real stories of pets whose lives and nap spots were transformed by Fur&Fab.</p>
            </div>

            <div className="pet-grid">
              <div className="pet-card" onClick={() => setSelectedPet('coco')}>
                <div className="pet-image-wrapper">
                  <img src={cocoImage} alt="Coco Rottweiler" />
                  <span className="badge">Featured Dog</span>
                </div>
                <div className="pet-info">
                  <h3>Coco</h3>
                  <p className="breed">Rottweiler (Indian Origin)</p>
                  <button className="pet-detail-btn">View Coco's Story & Solution →</button>
                </div>
              </div>

              <div className="pet-card" onClick={() => setSelectedPet('miko')}>
                <div className="pet-image-wrapper">
                  <img src={mikoImage} alt="Miko Persian Cat" />
                  <span className="badge">Featured Cat</span>
                </div>
                <div className="pet-info">
                  <h3>Miko</h3>
                  <p className="breed">Persian Cat</p>
                  <button className="pet-detail-btn">View Miko's Story & Solution →</button>
                </div>
              </div>
            </div>

            {selectedPet === 'coco' && (
              <div className="pet-modal-overlay" onClick={() => setSelectedPet(null)}>
                <div className="pet-modal" onClick={(e) => e.stopPropagation()}>
                  <button className="close-modal" onClick={() => setSelectedPet(null)}>✕</button>
                  <div className="modal-header">
                    <img src={cocoImage} alt="Coco Rottweiler" />
                    <div>
                      <h2>1. Coco</h2>
                      <p className="modal-breed">Breed: Rottweiler (Indian Origin)</p>
                    </div>
                  </div>
                  <div className="modal-body">
                    <div className="problem-box">
                      <h4>⚠️ Coco's Challenges:</h4>
                      <p>As a heavy-built Rottweiler living in a humid climate, Coco suffers from frequent skin itchiness on his belly and paws. His heavy bedding quickly trapped deep pet body odor, while harsh household laundry detergents left chemical residues that triggered allergic reactions.</p>
                    </div>
                    <div className="solution-box">
                      <h4>✨ Why Fur&Fab Detergent Works for Coco:</h4>
                      <p>Fur&Fab's 100% plant-based, toxin-free formula neutralizes tough Rottweiler odor at a molecular level without synthetic fragrances. It rinses 100% clean from heavy bedding, ensuring zero harsh chemical residue touches Coco's sensitive skin, leaving his favorite resting spots fresh and allergy-free for up to 15 days!</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedPet === 'miko' && (
              <div className="pet-modal-overlay" onClick={() => setSelectedPet(null)}>
                <div className="pet-modal" onClick={(e) => e.stopPropagation()}>
                  <button className="close-modal" onClick={() => setSelectedPet(null)}>✕</button>
                  <div className="modal-header">
                    <img src={mikoImage} alt="Miko Persian Cat" />
                    <div>
                      <h2>2. Miko</h2>
                      <p className="modal-breed">Breed: Persian Cat</p>
                    </div>
                  </div>
                  <div className="modal-body">
                    <div className="problem-box">
                      <h4>⚠️ Miko's Challenges:</h4>
                      <p>Miko has luxurious long coat fur that easily traps dust, dander, and hairballs into fleece blankets and cushions. Cats are extremely sensitive to synthetic essential oils and laundry toxins, which caused Miko to sneeze and avoid freshly washed blankets.</p>
                    </div>
                    <div className="solution-box">
                      <h4>✨ Why Fur&Fab Detergent Works for Miko:</h4>
                      <p>Fur&Fab is crafted with feline-safe, scent-safe plant cleaners that effortlessly lift cat dander and hair from plush fabrics. It leaves zero artificial scent, making blanket cuddle sessions 100% safe, cozy, and sneezing-free for Miko's sensitive respiratory system.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {page === 'customise' && (
          <section className="customise-page" id="customise">
            <div className="customise-hero">
              <p className="eyebrow">TAILORED CARE</p>
              <h1>Fur&Fab Personalisation Quiz</h1>
              <p>Answer a few quick questions about your pet, their coat, and laundry habits so our scientists can curate their custom fabric care regimen!</p>
            </div>

            <div className="customise-container">
              {!customiseSubmitted ? (
                <div className="quiz-card">
                  {/* Step Progress Bar */}
                  <div className="quiz-progress-bar">
                    <div className={`progress-step ${quizStep >= 1 ? 'active' : ''}`}>
                      <span className="step-num">1</span>
                      <span className="step-label">About Your Pet</span>
                    </div>
                    <div className="progress-line"></div>
                    <div className={`progress-step ${quizStep >= 2 ? 'active' : ''}`}>
                      <span className="step-num">2</span>
                      <span className="step-label">Cleaning Needs</span>
                    </div>
                    <div className="progress-line"></div>
                    <div className={`progress-step ${quizStep >= 3 ? 'active' : ''}`}>
                      <span className="step-num">3</span>
                      <span className="step-label">Lifestyle & Laundry</span>
                    </div>
                  </div>

                  {/* SECTION 1: ABOUT YOUR PET */}
                  {quizStep === 1 && (
                    <div className="quiz-section">
                      <h2>1. 🐾 ABOUT YOUR PET</h2>
                      <p className="section-subtext">Understanding the pet</p>

                      {/* Q1 */}
                      <div className="quiz-group">
                        <label className="quiz-question">Q1. What kind of pet do you have?</label>
                        <div className="quiz-options-grid cols-3">
                          {['Dog 🐶', 'Cat 🐱', 'Both 🐶🐱'].map((opt) => {
                            const val = opt.split(' ')[0]
                            return (
                              <button
                                key={opt}
                                type="button"
                                className={`option-btn ${quizForm.petKind === val ? 'selected' : ''}`}
                                onClick={() => setQuizForm({ ...quizForm, petKind: val })}
                              >
                                {opt}
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Q2 */}
                      <div className="quiz-group">
                        <label className="quiz-question">Q2. What is your pet’s breed and coat type?</label>
                        <input
                          type="text"
                          className="quiz-text-input"
                          placeholder="Enter breed (e.g. Golden Retriever, Persian Cat, Husky...)"
                          value={quizForm.breed}
                          onChange={(e) => setQuizForm({ ...quizForm, breed: e.target.value })}
                        />
                        <label className="quiz-sublabel">Select Coat Type:</label>
                        <div className="quiz-options-grid cols-2">
                          {[
                            'Short & smooth coat',
                            'Long & fine coat',
                            'Thick / double coat',
                            'Curly / woolly',
                            'Very little / no fur'
                          ].map((ct) => (
                            <button
                              key={ct}
                              type="button"
                              className={`option-btn ${quizForm.coatType === ct ? 'selected' : ''}`}
                              onClick={() => setQuizForm({ ...quizForm, coatType: ct })}
                            >
                              {ct}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Q3 */}
                      <div className="quiz-group">
                        <label className="quiz-question">Q3. Does your pet have any allergies or sensitivities?</label>
                        <div className="quiz-options-grid cols-2">
                          {[
                            'No',
                            'Sensitive skin',
                            'Fragrance sensitivity',
                            'Known allergies',
                            'Not sure'
                          ].map((sens) => (
                            <button
                              key={sens}
                              type="button"
                              className={`option-btn ${quizForm.sensitivities === sens ? 'selected' : ''}`}
                              onClick={() => setQuizForm({ ...quizForm, sensitivities: sens })}
                            >
                              {sens}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="quiz-nav-btns">
                        <button type="button" className="next-btn" onClick={() => setQuizStep(2)}>Next: Cleaning Needs →</button>
                      </div>
                    </div>
                  )}

                  {/* SECTION 2: THEIR CLEANING NEEDS */}
                  {quizStep === 2 && (
                    <div className="quiz-section">
                      <h2>2. 🧼 THEIR CLEANING NEEDS</h2>
                      <p className="section-subtext">Understanding what Fur&Fab needs to tackle</p>

                      {/* Q4 */}
                      <div className="quiz-group">
                        <label className="quiz-question">Q4. What is your pet’s biggest laundry problem? <small>(Choose up to 2)</small></label>
                        <div className="quiz-options-grid cols-2">
                          {[
                            '🐾 Fur / hair',
                            '👃 Persistent odour',
                            '💧 Urine / accidents',
                            '🥣 Drool / food',
                            '🌧️ Mud / dirt',
                            '🧼 Stains',
                            'No major problem'
                          ].map((prob) => {
                            const isSelected = quizForm.problems.includes(prob)
                            return (
                              <button
                                key={prob}
                                type="button"
                                className={`option-btn ${isSelected ? 'selected' : ''}`}
                                onClick={() => toggleProblem(prob)}
                              >
                                {isSelected ? '✓ ' : ''}{prob}
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Q5 */}
                      <div className="quiz-group">
                        <label className="quiz-question">Q5. How dirty does your pet’s laundry usually get?</label>
                        <div className="quiz-options-grid cols-1">
                          {[
                            'Light — mostly freshening',
                            'Moderate — everyday dirt & fur',
                            'Heavy — stains, mud & strong odour'
                          ].map((dl) => (
                            <button
                              key={dl}
                              type="button"
                              className={`option-btn ${quizForm.dirtLevel === dl ? 'selected' : ''}`}
                              onClick={() => setQuizForm({ ...quizForm, dirtLevel: dl })}
                            >
                              {dl}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Q6 */}
                      <div className="quiz-group">
                        <label className="quiz-question">Q6. How much does your pet shed?</label>
                        <div className="quiz-options-grid cols-3">
                          {['Low', 'Moderate', 'Heavy'].map((sh) => (
                            <button
                              key={sh}
                              type="button"
                              className={`option-btn ${quizForm.shedding === sh ? 'selected' : ''}`}
                              onClick={() => setQuizForm({ ...quizForm, shedding: sh })}
                            >
                              {sh}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="quiz-nav-btns">
                        <button type="button" className="prev-btn" onClick={() => setQuizStep(1)}>← Back</button>
                        <button type="button" className="next-btn" onClick={() => setQuizStep(3)}>Next: Lifestyle & Laundry →</button>
                      </div>
                    </div>
                  )}

                  {/* SECTION 3: THEIR LIFESTYLE & LAUNDRY */}
                  {quizStep === 3 && (
                    <form className="quiz-section" onSubmit={handleCustomiseSubmit}>
                      <h2>3. 🏠 THEIR LIFESTYLE & LAUNDRY</h2>
                      <p className="section-subtext">Understanding the fabrics and frequency</p>

                      {/* Q7 */}
                      <div className="quiz-group">
                        <label className="quiz-question">Q7. What do you wash most often? <small>(Choose all that apply)</small></label>
                        <div className="quiz-options-grid cols-2">
                          {[
                            'Beds & bedding',
                            'Blankets',
                            'Pet clothes',
                            'Towels',
                            'Soft toys',
                            'Mats / crate bedding',
                            'Sofa / cushion covers'
                          ].map((fab) => {
                            const isSelected = quizForm.fabrics.includes(fab)
                            return (
                              <button
                                key={fab}
                                type="button"
                                className={`option-btn ${isSelected ? 'selected' : ''}`}
                                onClick={() => toggleFabric(fab)}
                              >
                                {isSelected ? '✓ ' : ''}{fab}
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Q8 */}
                      <div className="quiz-group">
                        <label className="quiz-question">Q8. What is your pet’s lifestyle?</label>
                        <div className="quiz-options-grid cols-2">
                          {[
                            'Mostly indoors',
                            'Indoor + outdoor',
                            'Mostly outdoors',
                            'Very active / frequently outdoors'
                          ].map((ls) => (
                            <button
                              key={ls}
                              type="button"
                              className={`option-btn ${quizForm.lifestyle === ls ? 'selected' : ''}`}
                              onClick={() => setQuizForm({ ...quizForm, lifestyle: ls })}
                            >
                              {ls}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Q9 */}
                      <div className="quiz-group">
                        <label className="quiz-question">Q9. How often do you wash their fabrics?</label>
                        <div className="quiz-options-grid cols-2">
                          {[
                            '2–3 times a week',
                            'Once a week',
                            'Every 2 weeks',
                            'Once a month / occasionally'
                          ].map((freq) => (
                            <button
                              key={freq}
                              type="button"
                              className={`option-btn ${quizForm.washFrequency === freq ? 'selected' : ''}`}
                              onClick={() => setQuizForm({ ...quizForm, washFrequency: freq })}
                            >
                              {freq}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Owner Info & Submit */}
                      <div className="quiz-contact-box">
                        <h3>Receive Your Tailored Formula & Wash Plan</h3>
                        <div className="quiz-input-row">
                          <input
                            type="text"
                            placeholder="Your Name *"
                            className="quiz-text-input"
                            value={quizForm.ownerName}
                            onChange={(e) => setQuizForm({ ...quizForm, ownerName: e.target.value })}
                            required
                          />
                          <input
                            type="email"
                            placeholder="Your Email Address *"
                            className="quiz-text-input"
                            value={quizForm.ownerEmail}
                            onChange={(e) => setQuizForm({ ...quizForm, ownerEmail: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div className="quiz-nav-btns">
                        <button type="button" className="prev-btn" onClick={() => setQuizStep(2)}>← Back</button>
                        <button type="submit" className="submit-btn">Get My Custom Regimen →</button>
                      </div>
                    </form>
                  )}
                </div>
              ) : (
                <div className="customise-success">
                  <div className="success-icon">✨ 🐾</div>
                  <h2>Custom Regimen Ready for {quizForm.ownerName || 'Your Pet'}!</h2>
                  <p className="success-sub">Tailored for your <strong>{quizForm.petKind}</strong> ({quizForm.breed || 'All Breeds'}, {quizForm.coatType})</p>

                  <div className="regimen-summary-card">
                    <h3>🧪 Formulated Product Profile:</h3>
                    <ul>
                      <li><strong>Target Problems:</strong> {quizForm.problems.join(', ') || 'General Pet Freshening'}</li>
                      <li><strong>Sensitivity Care:</strong> {quizForm.sensitivities === 'No' ? '100% Plant-Based Hypoallergenic Formula' : `Specialized ${quizForm.sensitivities} Defense Formula`}</li>
                      <li><strong>Wash Dosage:</strong> {quizForm.dirtLevel.includes('Heavy') ? '1.5 Scoops per load (High Dirt Blend)' : '1 Scoop per load (Standard Freshening)'}</li>
                      <li><strong>Frequency Recommendation:</strong> Wash {quizForm.fabrics.slice(0, 2).join(' & ')} {quizForm.washFrequency}</li>
                    </ul>
                  </div>

                  <p className="success-message">
                    We've emailed your complete formulation breakdown and wash schedule to <strong>{quizForm.ownerEmail}</strong>. Our veterinary formulation team is reviewing your inputs!
                  </p>

                  <button className="reset-btn" onClick={() => { setCustomiseSubmitted(false); setQuizStep(1); }}>Retake Quiz</button>
                </div>
              )}
            </div>
          </section>
        )}

        <footer className="site-footer" id="find-us">
          <div className="footer-brand"><img src="/fur-fab-logo.png" alt="Fur and Fab" /><p>Cleaner fabrics. Happier pets.</p><div className="social-links"><a href="#instagram">Instagram</a><a href="#facebook">Facebook</a></div></div>
          <div><h3>Explore</h3><a href="#shop">Shop</a><a href="#about">Our story</a><a href="#petfluencers">Petfluencers</a><a href="#customise">Customise Care</a></div>
          <div><h3>Help</h3><a href="#contact">Contact us</a><a href="#shipping">Shipping & returns</a><a href="#faq">FAQs</a></div>
          <div className="newsletter"><h3>Stay in the pack</h3><p>Get pet care tips and 10% off your first order.</p><form onSubmit={(event) => { event.preventDefault(); setJoined(true) }}><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email address" required aria-label="Email address" /><button aria-label="Subscribe"><Icon name="arrow" /></button></form>{joined && <small>You're on the list. Welcome to the pack!</small>}</div>
          <div className="footer-bottom"><span>© 2026 Fur&Fab. All rights reserved.</span><span>Made for the messes that make memories.</span></div>
        </footer>
      </div>
    </main>
  )
}

export default App
