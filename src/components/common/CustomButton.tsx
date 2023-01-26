import React from 'react';
import styled from 'styled-components';

type CustomButtonProps = {
  bgColor?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  height?: number;
  width?: number;
};

const CustomButton = ({
  height,
  width = 4,
  bgColor,
  children,
  onClick,
}: CustomButtonProps) => {
  return (
    <Button bgColor={bgColor} height={height} width={width} onClick={onClick}>
      {children}
    </Button>
  );
};

export default CustomButton;

const Button = styled.button<CustomButtonProps>`
  flex: 1;
  cursor: pointer;
  background: ${(props) => props.bgColor};
  color: #fff;
  padding: ${(props) => props.height}px ${(props) => props.width}px;
  border-radius: 50px;
`;
