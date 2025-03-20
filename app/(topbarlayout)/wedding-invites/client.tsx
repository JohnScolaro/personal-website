'use client'

import { useState, useEffect } from "react";
import { emojiCursor } from "cursor-effects";
import Image from "next/image";
import Head from 'next/head';

const INVITED_GUESTS = [
    { code: "lawnbowls", persons: ["Valentino Scolaro"] },
    { code: "best_swimmers", persons: ["Christina Scolaro", "Martin Banks"] },
    { code: "chloe_poop", persons: ["Laura Douglas", "Dallas Douglas"] },
    { code: "peeba_stinky", persons: ["Anna Scolaro", "Joshua You"] },
    { code: "coobie123", persons: ["Robyn Bohl", "Gordon Bohl"] },
    { code: "optics", persons: ["Graham Bohl", "Kim Bohl"] },
    { code: "railing_king", persons: ["Alex Bohl"] },
    { code: "prime_numba", persons: ["Harrison Bohl"] },
    { code: "mooloolaba_swimmer", persons: ["Tanya Revell"] },
    { code: "chookie", persons: ["Brooke Revell"] },
    { code: "mr_electricity", persons: ["Tom Revell"] },
    { code: "big_john", persons: ["John Revell"] },
    { code: "bianchi", persons: ["Robert Bianchi", "Katrina Bianchi"] },
    { code: "big_biceps", persons: ["Nick Bianchi"] },
    { code: "sophie", persons: ["Sophie Bianchi"] },
    { code: "teo", persons: ["Matthew Scolaro"] },
    { code: "linny", persons: ["Linda Scanlan"] },
    { code: "vase_queen", persons: ["Lauren Baade"] },
    { code: "flower_power", persons: ["Kirsten Baade"] },
    { code: "epic_mother_of_bride", persons: ["Ingrid Aulike"] },
    { code: "gone_fishing", persons: ["Robert Baade", "Fiona Mackie"] },
    { code: "stardew_valley", persons: ["Ryan Watson", "Niamh Watson"] },
    { code: "pallywallyacuttman", persons: ["Calum Acutt", "Jazmin Eather"] },
    { code: "barry", persons: ["Harry Buchanan", "Bree Dow"] },
    { code: "spaghetti", persons: ["Lucas Rossdeutcher", "Christina Nicolas"] },
    { code: "toby", persons: ["Harry Sax", "Emily Sax"] },
    { code: "red_fortnite", persons: ["Milyka McCutcheon", "Natalie Alkass"] },
    { code: "yellow_chef", persons: ["Natalie McNeill", "Jordan Falvey"] },
    { code: "green_lego", persons: ["Ceara Swyripa", "Sam Gansberg"] },
    { code: "elliott", persons: ["Chloe Dorkhom", "Michael Dorkhom"] },
    { code: "uq_track", persons: ["Jess Jordan", "Adam Jordan"] },
    { code: "theo_cute", persons: ["Julia Uecker", "Mickey Traber Juhl Anderson"] },
    { code: "nana_jean", persons: ["Jean Baade"] },
    { code: "uncle_craig", persons: ["Craig Baade", "Susan Goodland-Baade"] },
    { code: "uncle_greg", persons: ["Greg Baade", "Linda Baade"] },
    { code: "uncle_andrew", persons: ["Andrew Baade"] },
    { code: "big_al", persons: ["Alex Harper"] },
];

export default function WeddingRSVP() {
    const [rsvpCode, setRsvpCode] = useState("");
    const [guests, setGuests] = useState([]);
    const [validCode, setValidCode] = useState(false);

    useEffect(() => {
        const effect = emojiCursor({ emoji: ["❤️"] });

        return () => {
            document.querySelectorAll(".emojiCursor").forEach(el => el.remove());
        };
    }, []);

    const handleCodeSubmit = () => {
        const entry = INVITED_GUESTS.find((g) => g.code === rsvpCode);
        if (entry) {
            setGuests(entry.persons.map((name) => ({ name, attending: true, dietaries: "", accommodations: "", favoriteThing: "", favoriteSong: "", favoriteAnimal: "", favoriteColor: "" })));
            setValidCode(true);
        } else {
            alert("Invalid RSVP code.");
        }
    };

    const handleGuestChange = (index, field, value) => {
        const updatedGuests = [...guests];
        updatedGuests[index][field] = value;
        setGuests(updatedGuests);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(JSON.stringify({ guests }));
            const response = await fetch("https://script.google.com/macros/s/AKfycbwIK0HeENHlcOIHKD7pW91jnWgiAPkbpC0h4ZqR2tC6hXAF-a-16eo4hbcFgj43LY0D/exec", {
                redirect: "follow",
                method: "POST",
                headers: { "Content-Type": "text/plain;charset=utf-8" },
                body: JSON.stringify({ guests })
            });

            if (!response.ok) {
                throw new Error("Failed to submit RSVP");
            }

            alert("RSVP submitted! Thank you!");
        } catch (error) {
            console.error("Error submitting RSVP:", error);
            alert("There was an error submitting your RSVP. Please try again.");
        }
    };
    const [showImage, setShowImage] = useState(false);

    const handleClick = () => {
        setShowImage((prev) => !prev);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-pink-100 text-center p-4 relative">
            <Head>
                <style>
                    {`
                    @keyframes pulse-border {
                        0% { box-shadow: 0 0 10px #ff69b4; }
                        50% { box-shadow: 0 0 20px #ff1493; }
                        100% { box-shadow: 0 0 10px #ff69b4; }
                    }
                    `}
                </style>
            </Head>

            <Image
                src="/images/wedding-invite/img.jpg"
                width={500}
                height={500}
                priority={true}
                alt="John and Helen"
                className="mb-6 rounded-full"
                style={{ animation: "pulse-border 2s infinite alternate" }}
            />
            <div className="max-w-screen-md w-full px-6 py-8 bg-white rounded-xl shadow-lg">
                <h1 className="text-5xl font-extrabold text-pink-600 text-center">
                    You're Invited to
                    <br /> Helen & John's Wedding!
                </h1>

                <p className="text-3xl font-semibold text-pink-500 text-center mt-4">
                    25 • 06 • 25
                </p>

                <div className="mt-8 space-y-6 text-gray-700 text-lg relative">
                    <h2 className="text-2xl font-extrabold text-pink-600">Ceremony</h2>
                    <p>
                        Brisbane Powerhouse, 119 Lamington St, New Farm QLD 4005
                    </p>
                    <p>Please gather in the <span
                        className="relative cursor-pointer text-pink-500 hover:underline"
                        onClick={handleClick}
                    >
                        main entrance
                    </span> by 2:25 PM latest for a 2:45 PM ceremony</p>

                    {showImage && (
                        <div className="absolute left-0 mt-2 p-2 bg-white border rounded-lg shadow-lg z-10">
                            <Image
                                src="/images/wedding-invite/entrance.jpg"
                                alt="Brisbane Powerhouse Main Entrance"
                                className="w-64 h-auto rounded"
                                width={500}
                                height={500}
                            />
                        </div>
                    )}
                </div>

                <div className="mt-8 space-y-6 text-gray-700 text-lg">

                    <h2 className="text-2xl font-extrabold text-pink-600">Transportation</h2>
                    <p>Shuttle service to the reception provided.</p>
                    <p>Further details will be shared closer to the date.</p>

                    <h2 className="text-2xl font-extrabold text-pink-600">Reception</h2>
                    <p>Industry Beans, 18 Proe St, Newstead QLD 4006</p>
                    <p>4:00 PM - 10:00 PM</p>

                    <h2 className="text-2xl font-extrabold text-pink-600">Dress Code</h2>
                    <p>Formal</p>

                    <h2 className="text-2xl font-extrabold text-pink-600">Gift</h2>
                    <p>We don't expect anything at all, and we'll be over the moon if you can come!
                        But if you'd like to give, there will be a wishing well at the reception.</p>
                </div>

                <p className="mt-10 text-lg font-semibold text-center">
                    Please RSVP by filling out the form below before
                    <span className="text-pink-600"> April 14th</span>.
                </p>
            </div>


            {!validCode ? (
                // <div className="mt-6 bg-white p-6 rounded-2xl shadow-xl w-96">
                <div className="mt-6 bg-white p-6 rounded-2xl shadow-xl max-w-screen-md">
                    <input type="text" placeholder="Enter your RSVP code" value={rsvpCode} onChange={(e) => setRsvpCode(e.target.value)} className="w-full p-2 border rounded-md mb-3" />
                    <button onClick={handleCodeSubmit} className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">Submit Code</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="mt-6 bg-white p-6 rounded-2xl shadow-xl w-full max-w-4xl">
                    {guests.map((guest, index) => (
                        <div key={index} className="mb-8 flex flex-col space-y-2">
                            <div className="flex items-center">
                                <input type="text" value={guest.name} disabled className="w-full p-2 border rounded-md bg-gray-100" />
                                <label className="flex items-center ml-2">
                                    <input type="checkbox" checked={guest.attending} onChange={(e) => handleGuestChange(index, "attending", e.target.checked)} className="mr-2" />
                                    Attending
                                </label>
                            </div>
                            <input type="text" placeholder="Dietary Requirements" value={guest.dietaries} onChange={(e) => handleGuestChange(index, "dietaries", e.target.value)} className="w-full p-2 border rounded-md" />
                            <input type="text" placeholder="Any Other Accommodations" value={guest.accommodations} onChange={(e) => handleGuestChange(index, "accommodations", e.target.value)} className="w-full p-2 border rounded-md" />
                            <input type="text" placeholder="Favourite Song" value={guest.favoriteSong} onChange={(e) => handleGuestChange(index, "favoriteSong", e.target.value)} className="w-full p-2 border rounded-md" />
                            <input type="text" placeholder="Favourite Colour" value={guest.favoriteColor} onChange={(e) => handleGuestChange(index, "favoriteColor", e.target.value)} className="w-full p-2 border rounded-md" />
                            <input type="text" placeholder="Best Marriage Advice" value={guest.advice} onChange={(e) => handleGuestChange(index, "advice", e.target.value)} className="w-full p-2 border rounded-md" />
                        </div>
                    ))}
                    <button type="submit" className="w-full p-2 bg-pink-500 text-white rounded-md hover:bg-pink-700">Submit</button>
                </form>
            )}
        </div>
    );
}
