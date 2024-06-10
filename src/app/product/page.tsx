import Link from "next/link";

const Product = () => {

    return (
        <main className="flex items-center justify-center bg-background_light min-h-screen sm:py-32 lg:px-8 h-full">
            <div className="text-center">
                <p className="text-3xl front-semibold text-error">404</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text sm:text-5xl">
                    Sorry, we couldnt find the page you are looking for
                </h1>
                <div className="text-3xl">
                    <Link href="/" className="rounded-md bg-secondary px-3.5 py-2.5 text-sm fpmt-semibold text-background_light shadow-sm hover:bg-tertiary focus-visible_outline">
                        Go back home
                    </Link>
                </div>
            </div>
        </main>
    )
}

export default Product;
