"""
Originally I added all the 3000 x 3000 px images here directly. After about 200
images, I hit an issue with Vercel, where it complained via error:

Error: A Serverless Function has exceeded the unzipped maximum size of 250 MB. : https://vercel.link/serverless-function-size

So my quick and dirty hack for this website was to just convert all my images
to 1500 x 1500 px jpegs (and store the full resolution images somewhere else)
which should allow me to continue hosting my website for $0 on Vercel without
much additional effort. This script does the conversion.
"""

from PIL import Image
import os

def resize_images(input_folder: str, output_folder: str, new_size: tuple[int, int]):
    # Create the output folder if it doesn't exist
    os.makedirs(output_folder, exist_ok=True)

    # Loop through each file in the input folder
    for filename in os.listdir(input_folder):
        if filename.endswith(".png"):
            input_path = os.path.join(input_folder, filename)
            output_path = os.path.join(output_folder, os.path.splitext(filename)[0] + ".jpg")

            # Open the image
            with Image.open(input_path) as img:

                # Remove transparency in PNG somehow.
                if img.mode == 'RGBA':
                    img = img.convert('RGB')

                # Resize the image
                resized_img = img.resize(new_size, Image.ANTIALIAS)

                # Save the resized image as JPEG
                resized_img.save(output_path, "JPEG", quality=95)

            print(f'Converted image {filename}')

if __name__ == "__main__":
    # Set the input folder containing PNG files
    input_folder = "."

    # Set the output folder for JPEG files
    output_folder = "./output"

    # Set the new dimensions for the images
    new_size = (1500, 1500)

    # Resize the images
    resize_images(input_folder, output_folder, new_size)
