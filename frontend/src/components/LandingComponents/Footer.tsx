import { BrainIcon } from "../icons/brainIcon"

export const Footer = () => {

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="w-full bg-gray-900 text-white py-16">
            <div className="max-w-6xl mx-auto px-4">
                {/* Main Footer Content */}
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    {/* Brand Column */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-4 mb-4 cursor-pointer transition-opacity" onClick={scrollToTop}>
                            <BrainIcon/>
                            <span className="text-xl font-bold">Second Brain</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            Keep all your links, notes, and resources connected in one space to boost your productivity.
                        </p>
                    </div>

                    {/* Product Column */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Product</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <button 
                                    onClick={scrollToTop} 
                                    className="text-gray-400 hover:text-white transition-colors text-left"
                                >
                                    Second Brain
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => window.open('https://github.com/Ankushkr14/Second_Brain', '_blank')}
                                    className="text-gray-400 hover:text-white transition-colors text-left"
                                >
                                    Documentation
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => scrollToSection('features')} 
                                    className="text-gray-400 hover:text-white transition-colors text-left"
                                >
                                    Features
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Connect Column */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Connect</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="https://github.com/Ankushkr14" target="_blank" className="text-gray-400 hover:text-white transition-colors">GitHub</a></li>
                            <li><a href="https://github.com/Ankushkr14" target="_blank" className="text-gray-400 hover:text-white transition-colors">Portfolio</a></li>
                            <li><a href="https://www.linkedin.com/in/ankushkr14/" target="_blank" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a></li>
                            <li><a href="mailto:me.ankushkr@gmail.com" target="_self" className="text-gray-400 hover:text-white transition-colors">Contact Me</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm mb-4 md:mb-0">
                            © 2025 Second Brain. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <p className="text-gray-400 text-sm mb-4 md:mb-0">
                                Made with ❤️ by Ankush. Personal project for organizing knowledge.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}