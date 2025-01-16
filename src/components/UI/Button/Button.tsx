interface ButtonPage {
    text: string
    type ?: "button" | "submit" | "reset"
    className: string
  }
  
  export const Button = ({ className , text, type}: ButtonPage) => {
    return (
      <button className={className} type={type}>{text}</button>
    )
  }
  