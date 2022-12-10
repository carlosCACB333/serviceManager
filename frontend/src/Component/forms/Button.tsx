import { Button as Btn } from '@chakra-ui/react';

interface Props {
  title: string;
  type?: 'submit' | 'button';
  variant?: 'ghost' | 'link' | 'outline' | 'solid' | 'unstyled';
  my?: number;
  bgGradient?: string;
  disabled?: boolean;
  onClick?: () => void;
  [x: string]: any;
}
const Button = ({
  title,
  type = 'button',
  my = 5,
  bgGradient = 'linear(to-r, red.400,pink.400)',
  disabled = false,
  variant = 'solid',
  onClick,
  ...rest
}: Props) => {
  return (
    <Btn
      variant={variant}
      type={type}
      fontFamily={'heading'}
      mt={my}
      w={'full'}
      bgGradient={bgGradient}
      color={'white'}
      _hover={{
        boxShadow: 'xl',
      }}
      onClick={() => onClick && onClick()}
      disabled={disabled}
      {...rest}
    >
      {title}
    </Btn>
  );
};

export default Button;
