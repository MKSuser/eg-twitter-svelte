import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'

import Twitter from './routes/+page.svelte'

describe('twitter', () => {
  it('should start with empty string', () => {
    render(Twitter)

    const text = screen.getByTestId('texto') as HTMLInputElement
    expect(text.value).to.equal('')

    const caracteres = screen.getByTestId('restantes')
    expect(+caracteres.innerHTML).to.equal(140)
    expect(caracteres.classList.contains('ok')).toBeTruthy()
  })

  it('should decrease remaining characters if a tweet is written - positive remaining characters', async () => {
    render(Twitter)

    const text = screen.getByTestId('texto') as HTMLInputElement
    await userEvent.type(text, 'A new tweet')

    const caracteres = screen.getByTestId('restantes')
    expect(+caracteres.innerHTML).to.equal(129)
  })

  it('should decrease remaining characters if a tweet is written - negative remaining characters', async () => {
    render(Twitter)

    const text = screen.getByTestId('texto') as HTMLInputElement
    await userEvent.type(text, '123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890')

    const caracteres = screen.getByTestId('restantes')
    expect(+caracteres.innerHTML).to.equal(-10)
    expect(caracteres.classList.contains('pasado')).toBeTruthy()

  })

  it('should have a specific class for tweet reaching the limit', async () => {
    render(Twitter)

    const text = screen.getByTestId('texto') as HTMLInputElement
    await userEvent.type(text, '1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789')

    const caracteres = screen.getByTestId('restantes')
    expect(caracteres.classList.contains('pasado')).toBeTruthy()
  })

  it('should have a specific class for tweet getting close to the limit', async () => {
    render(Twitter)

    const text = screen.getByTestId('texto') as HTMLInputElement
    await userEvent.type(text, '123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012')

    const caracteres = screen.getByTestId('restantes')
    expect(caracteres.classList.contains('limite')).toBeTruthy()
  })

})
