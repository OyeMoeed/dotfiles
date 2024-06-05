import { Card, CardIcon, LogoBlueIcon, MenueIcon, ShoppingIcon } from "@app/assets/svgs/index";
import { useNavigation } from "@react-navigation/native";
const buttonData = [
    {
    id:1,
    text:'Home',
    icon: LogoBlueIcon,
},
{
    id:2,
    text:'Cards',
    icon: Card,
},
{
    id:3,
    text:'Marketplace',
    icon: ShoppingIcon,
},
{
    id:4,
    text:'More',
    icon: MenueIcon,
}
];

export default buttonData;