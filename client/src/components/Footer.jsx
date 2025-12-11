import React from 'react';

function Footer() {
    return (
        <footer className="bg-white border-t mt-12 py-8 text-center text-gray-500 text-sm">
            <div className="max-w-4xl mx-auto px-4">
                <p className="font-semibold text-gray-700 mb-2">Kampus PH</p>
                <p>The exclusive marketplace for Filipino students.</p>
                {/* <div className="flex justify-center gap-4 mt-4">
                    <a href="#" className="hover:text-blue-600">Safety Tips</a>
                    <a href="#" className="hover:text-blue-600">Terms</a>
                    <a href="#" className="hover:text-blue-600">Privacy</a>
                </div> */}
                <p className="mt-8 text-xs text-gray-400">
                    &copy; {new Date().getFullYear()} Built with ♡ by Gabe Labariento
                </p>
            </div>
        </footer>
    );
}

export default Footer;