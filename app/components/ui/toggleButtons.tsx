import { Toggle } from "./toggle"

export const cityOptions = ["Vilnius", "Kaunas", "Klaipėda", "Šiauliai", "Panevėžys"] as const;
export type CityOption = typeof cityOptions[number];

export type ToggleButtonsProps = {
  selected: string
  setSelected: (selected: CityOption) => void
}

export function ToggleButtons({ selected, setSelected }: ToggleButtonsProps) {
  return (
    <div className="flex flex-row items-center gap-4">
      {cityOptions.map((option) => (
        <Toggle pressed={selected === option} onClick={() => setSelected(option)} key={option}>
          {option}
        </Toggle>
      ))}
    </div>
  )
}
