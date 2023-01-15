import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  height: 80px;
  margin-top: -80px;
  top: ${({ scrollDirection }) => (scrollDirection === 'down' ? '-80px' : '0')};
  background: var(--navbar-bg);
  color: var(--navbar-content);
  z-index: 999;
  box-shadow: ${({ scrollNav }) =>
    scrollNav ? '0 4px 8px 0 rgba(0, 0, 0, 0.1)' : 'none'};
  transition: 0.4s all ease;
`

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2rem;
  font-family: Lobster;
  cursor: pointer;
`

const Items = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 1rem;
  cursor: pointer;
`

const Btn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 40px;
  border: 1px solid var(--navbar-content);
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  @media screen and (max-width: 768px) {
    display: none;
  }

  @media screen and (hover: hover) {
    &:hover {
      background-color: var(--highlight);
      border: 1px solid var(--highlight);
      color: var(--navbar-bg);
    }
  }
`

// https://www.robinwieruch.de/react-hook-scroll-direction/

const THRESHOLD = 0

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = React.useState('up')
  const blocking = React.useRef(false)
  const prevScrollY = React.useRef(0)

  React.useEffect(() => {
    prevScrollY.current = window.pageYOffset
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset
      if (Math.abs(scrollY - prevScrollY.current) >= THRESHOLD) {
        const newScrollDirection = scrollY > prevScrollY.current ? 'down' : 'up'
        setScrollDirection(newScrollDirection)
        prevScrollY.current = scrollY > 0 ? scrollY : 0
      }
      blocking.current = false
    }

    const onScroll = () => {
      if (!blocking.current) {
        blocking.current = true
        window.requestAnimationFrame(updateScrollDirection)
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [scrollDirection])

  return scrollDirection
}

const Navbar = () => {
  const [scrollNav, setScrollNav] = useState(false)

  const changeNav = () => {
    setScrollNav(window.scrollY > 0)
  }

  useEffect(() => {
    window.addEventListener('scroll', changeNav)
  }, [])

  return (
    <Container scrollNav={scrollNav} scrollDirection={useScrollDirection()}>
      <Wrapper>
        <Logo>Shiyan</Logo>
        <Items>
          <Item>Home</Item>
          <Item>About</Item>
          <Item>Projects</Item>
          <Item>Contact</Item>
        </Items>
        <Btn>Download CV</Btn>
      </Wrapper>
    </Container>
  )
}

export default Navbar
