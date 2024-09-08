import Svg, { Defs, LinearGradient, Stop, Text as SvgText } from 'react-native-svg';
import { IPayGradientTextProps } from './ipay-gradient-text.interface';

const IPayGradientText: React.FC<IPayGradientTextProps> = ({
  testID,
  text,
  style,
  gradientColors,
  fontSize = 16,
  fontFamily = 'System',
  lineHeight = 1.2,
  yScale = 10,
  xScale = '50%',
  textAnchor = 'middle',
}) => {
  const textId = 'textGradient';
  const lines = text.split('\n');
  const textHeight = fontSize * lineHeight * lines.length;

  return (
    <Svg testID={`${testID}-svg-gradient-text`} height={textHeight} width="100%" style={style}>
      <Defs>
        <LinearGradient id={textId} x1="0" y1="0" x2="100%" y2="0">
          {gradientColors.map((color, index) => (
            <Stop key={index} offset={`${index * (100 / (gradientColors.length - 1))}%`} stopColor={color} />
          ))}
        </LinearGradient>
      </Defs>
      {lines.map((line, index) => (
        <SvgText
          key={index}
          fill={`url(#${textId})`}
          fontSize={fontSize}
          fontFamily={fontFamily}
          fontWeight="700"
          x={xScale}
          y={(index + 1) * fontSize * lineHeight - yScale}
          alignmentBaseline="middle"
          textAnchor={textAnchor}
        >
          {line}
        </SvgText>
      ))}
    </Svg>
  );
};

export default IPayGradientText;
