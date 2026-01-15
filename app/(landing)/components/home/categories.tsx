import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { getImageUrl } from "../../../lib/api";
import { Category } from "../../../types";

type TCategoriesProps = {
  categories: Category[];
};

const CategoriesSection = ({ categories }: TCategoriesProps) => {
  return (
    <section id="category-section" className="container mx-auto pb-20">
      <div className="flex justify-between">
        <h2 className="font-bold text-2xl">Browse By Categories</h2>
        <Link href="#" className="flex gap-2 text-primary font-medium">
          <span className="self-center">See All Categories</span>
          <FiArrowRight className="self-center" />
        </Link>
      </div>
      <div className="grid grid-cols-6 gap-12 mt-8">
        {categories.map((category) => (
          <div
            className="rounded-lg bg-linear-to-r from-[#f1f1f1] to-[#f7f7f7] w-full aspect-square flex justify-center"
            key={category._id}
          >
            <div className="self-center flex flex-col items-center">
              <Image
                src={getImageUrl(category.imageUrl)}
                alt={`${category.name}`}
                className="mb-2.5 "
                width={86}
                height={86}
              />
              <div className="text-primary font-medium text-xl text-center">
                {category.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
