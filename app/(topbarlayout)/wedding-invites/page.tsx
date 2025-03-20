import { Metadata } from "next";
import WeddingRSVP from "./client";

export const metadata: Metadata = {
    title: "Wedding Invitation",
    description:
        "A page where people can RSVP to our wedding",
    openGraph: {
        title: "Wedding Invitation",
        description:
            "A page where people can RSVP to our wedding",
        url: "https://johnscolaro.xyz/wedding-invites",
        images: [
            {
                url: "https://johnscolaro.xyz/images/wedding-invites/img.jpg",
                width: 1133,
                height: 1133,
                alt: 'An image of John and Helen',
            },
        ],
    },
};


export default function Page() {
    return <WeddingRSVP></WeddingRSVP>
}
