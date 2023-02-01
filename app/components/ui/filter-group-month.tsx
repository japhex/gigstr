import { Flex, Select } from '@chakra-ui/react'
import { MONTHS } from '@types/gig'

interface Props {
  name: string
  onClick: (value: string) => Promise<void>
  group: string[] | number[]
}

const FilterGroupMonth = ({ name, onClick, group }: Props) => {
  return (
    <Flex gap={2}>
      <Select placeholder={name} onChange={e => onClick(e.target.value)} borderColor="GREY4" w="150px">
        {group.map((item, index) => (
          <option value={item} key={index}>
            {MONTHS[item as number]}
          </option>
        ))}
      </Select>
    </Flex>
  )
}

export default FilterGroupMonth
