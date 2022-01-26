import React from 'react'
import { LandingHeader } from './LandingHeader'

export default function Landing() {
  return (
    <div>
      <LandingHeader/>
      <header id="showcase">
    <h1>Welcome To Movie Knight</h1>
    <p>Save time choosing movies and more time watching them</p>
    <a href="/signin" class="button">Join Now</a>
  </header>
  <section id="section-a">
    <p>Choosing movies seems to take up a lot of our movie watching time. Movie knight allows users to pre-select a list of movies for their guest to choose from. Guests swipe through the list of  pre-selected movies and choose the movies they are willing to watch. The website receives the information and provides the user with the top pick based on their guests choices. Voila! Movie picking has never been easier </p>
  </section>

    </div>
  )
}
