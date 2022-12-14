import Link from "next/link";
import styled from "styled-components";

const Circle = styled.span<{isSelected?: boolean}>`
  height: 27px;
  width: 27px;
  border: 2px solid #B5A642;
  background-color: ${props => props.isSelected ? '#B5A642' : 'none'};
  border-radius: 50%;
  display: inline-block;
  margin-bottom: 20px;
`

const BubbleWrap = styled.div`
  &:not(:last-child) {
    margin-right: 25px;
  }
`

type Props = {
    bubble: string
    selected: boolean
}

export const Bubble = ({ bubble, selected }: Props) => {
    return (
      <BubbleWrap>
      <Link href={`#${bubble}`}>
          <Circle isSelected={selected} />
      </Link>
      </BubbleWrap>
    )
}