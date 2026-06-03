import MainBanner from "../Components/Main/Main_Banner";
import MainBottomCards from "../Components/Main/Main_Bottom_Cards";


export default function Main() {
    return(
        <div className="w-full flex-1 flex-col flex items-center justify-center">
            <MainBanner/>

            <MainBottomCards/>
        </div>
    )
}