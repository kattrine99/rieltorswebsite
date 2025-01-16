interface ButtonPage {
    text: string
    type ?: "button" | "submit" | "reset"
  }
  
  export const Button = ({ text, type}: ButtonPage) => {
    return (
      <button type={type}>{text}</button>
    )
  }
  