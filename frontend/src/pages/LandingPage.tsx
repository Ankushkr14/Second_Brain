import { FeatureSection } from "../components/LandingComponents/FeatureSection";
import { Footer } from "../components/LandingComponents/Footer";
import { HeroSection } from "../components/LandingComponents/HeroSection";
import { NavigationBar } from "../components/LandingComponents/NavigationBar";
import { SecondHeroSection } from "../components/LandingComponents/SecondHeroSection";
import { UseCaseSection } from "../components/LandingComponents/UseCaseSection";


export function LandingPage(){
    return (
        <div style={{ backgroundColor: '#030c1c'}} className="min-h-screen w-screen">
            <NavigationBar/>
            <div className="pt-60">
                <div className="flex-1" id="home">
                    <HeroSection/>
                </div>
               <div id="features">
                    <FeatureSection/>
               </div>
            </div>
            <div className="pt-32" id="use-cases">
                <UseCaseSection/>
            </div>
            <div className="pt-24">
                <SecondHeroSection/>
            </div>
            <div className="pt-20">
                <Footer/>
            </div>
        </div>
    )
}