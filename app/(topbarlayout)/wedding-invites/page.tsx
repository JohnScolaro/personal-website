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
    { code: "", persons: ["Robyn Bohl", "Gordon Bohl"] },
    { code: "", persons: ["Graham Bohl", "Kim Bohl"] },
    { code: "", persons: ["Alex Bohl"] },
    { code: "prime_numba", persons: ["Harrison Bohl"] },
    { code: "", persons: ["Tanya Revell"] },
    { code: "", persons: ["Brooke Revell"] },
    { code: "", persons: ["Tom Revell"] },
    { code: "", persons: ["John Revell"] },
    { code: "", persons: ["Tanya Partner"] },
    { code: "", persons: ["Robert Scolaro", "Gemma Scolaro"] },
    { code: "", persons: ["Robert Bianchi", "Katrina Bianchi"] },
    { code: "", persons: ["Nicholas Bianchi"] },
    { code: "", persons: ["Sophia Bianchi"] },
    { code: "", persons: ["Matthew Scolaro"] },
    { code: "", persons: ["Linda Scanlan"] },
    { code: "", persons: ["Lauren Baade"] },
    { code: "", persons: ["Kirsten Baade"] },
    { code: "", persons: ["Ingrid Aulike"] },
    { code: "", persons: ["Sharron"] },
    { code: "", persons: ["Robert Baade", "Fiona"] },
    { code: "", persons: ["Ryan Watson", "Niamh Watson"] },
    { code: "pallywallyacuttman", persons: ["Calum Acutt", "Jasmine"] },
    { code: "", persons: ["Harry Buchanan", "Bree"] },
    { code: "", persons: ["Lucas Rossdeutcher", "Christina Nicolas"] },
    { code: "", persons: ["Harry Sax", "Emily Sax"] },
    { code: "", persons: ["Milyka McCutcheon", "Natalie Alkass"] },
    { code: "", persons: ["Natalie McNeill", "Jordan Falvey"] },
    { code: "", persons: ["Ceara Swyripa", "Sam Gansberg"] },
    { code: "elliots_parents", persons: ["Chloe Dorkhom", "Michael Dorkhom"] },
    { code: "browns_plains", persons: ["Jess Adams", "Jordan Adams"] },
    { code: "theo_cute", persons: ["Julia Uecker", "Mickey Traber Juhl Anderson"] },
];

export default function WeddingRSVP() {
    const [rsvpCode, setRsvpCode] = useState("");
    const [guests, setGuests] = useState([]);
    const [validCode, setValidCode] = useState(false);

    // Initialize emojiCursor only on the client-side
    useEffect(() => {
        emojiCursor({ emoji: ["❤️"] });
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
            const response = await fetch("https://script.google.com/macros/s/AKfycbyVyYk-X1r0qAWXRUL6c55boWgifwwV7k5a45xwPhN_fMqNKVgobsB8OS4WaYRGNYwp/exec", {
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

            <h1 className="text-4xl font-bold text-pink-600">You're invited to John and Helen's Wedding!</h1>
            <p className="mt-4 text-lg">Please RSVP by filling in the below form before the 1st of May:</p>
            <p className="mt-2 text-md text-gray-700">Venue: 123 Wedding St, Love City</p>
            <p className="mt-2 text-md text-gray-700">Dress Code: Formal attire</p>

            {!validCode ? (
                <div className="mt-6 bg-white p-6 rounded-2xl shadow-xl w-96">
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
                            <input type="text" placeholder="Favourite thing about Helen and John" value={guest.favoriteThing} onChange={(e) => handleGuestChange(index, "favoriteThing", e.target.value)} className="w-full p-2 border rounded-md" />
                            <input type="text" placeholder="Favourite Song" value={guest.favoriteSong} onChange={(e) => handleGuestChange(index, "favoriteSong", e.target.value)} className="w-full p-2 border rounded-md" />
                            <input type="text" placeholder="Favourite Animal" value={guest.favoriteAnimal} onChange={(e) => handleGuestChange(index, "favoriteAnimal", e.target.value)} className="w-full p-2 border rounded-md" />
                            <input type="text" placeholder="Favourite Colour" value={guest.favoriteColor} onChange={(e) => handleGuestChange(index, "favoriteColor", e.target.value)} className="w-full p-2 border rounded-md" />
                        </div>
                    ))}
                    <button type="submit" className="w-full p-2 bg-pink-500 text-white rounded-md hover:bg-pink-700">Submit</button>
                </form>
            )}
        </div>
    );
}
