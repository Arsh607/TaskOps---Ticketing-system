import { useState } from 'react'

/**
 * Custom hook for managing toggle state
 * Provides presentation logic for toggling boolean values (e.g., menus, modals, visibility)
 *
 * @param initialValue - Initial state of the toggle (default: false)
 * @returns An object containing:
 *   - isOpen: Current boolean state of the toggle
 *   - toggle: Function to toggle the state between true and false
 *   - open: Function to set state to true
 *   - close: Function to set state to false
 *
 * @example
 * const { isOpen, toggle, open, close } = useToggle(false)
 * return (
 *   <>
 *     <button onClick={toggle}>Toggle Menu</button>
 *     {isOpen && <Menu />}
 *   </>
 * )
 */
export function useToggle(initialValue: boolean = false) {
  const [isOpen, setIsOpen] = useState(initialValue)

  const toggle = () => setIsOpen(!isOpen)
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return { isOpen, toggle, open, close }
}
