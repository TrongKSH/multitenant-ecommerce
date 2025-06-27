import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { CustomCategory } from "../types";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: CustomCategory[]; //TODO: remove later
}

export const CategoriesSidebar = ({ open, onOpenChange, data }: Props) => {

    const router = useRouter();

    const [parentCategories, setParentCategories] = useState<CustomCategory[] | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<CustomCategory | null>(null);

    //If we have parent categories, show those, otherwise show root categoiries
    const currentCategories = parentCategories ?? data ?? [];
    const handleOpenChange = (open: boolean) => {
        console.log("here")
        setSelectedCategory(null);
        setParentCategories(null);
        onOpenChange(open)
    }

    const handlleCategoryClick = (category: CustomCategory) => {
        console.log(category)
        if (category.subcategories && category.subcategories.length > 0) {
            console.log("true")
            setParentCategories(category.subcategories as CustomCategory[]);
            setSelectedCategory(category)
        } else {
            console.log("true2")

            // This is a leaf category (No subcategories)
            if (parentCategories && selectedCategory) {
                //this is a subcategory - navigate to /category/subcategory
                router.push(`/${selectedCategory.slug}/${category.slug}`);
            } else {
                // this is a main category - navigate to /category
                if (category.slug === "all") {
                    router.push("/")
                } else {
                    router.push(`/${category.slug}`)
                }
            }
            handleOpenChange(false);
        }
    }

    const backgroundColor = selectedCategory?.color || "white";

    const handledBackClick = () => {
        if (parentCategories) {
            setParentCategories(null);
            setSelectedCategory(null);
        }
    }

    return (
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetContent
                side="left"
                className="p-o transition-none"
                style={{ backgroundColor }}
            >
                <SheetHeader className="p-4 border-b">
                    <SheetTitle>Categories</SheetTitle>
                </SheetHeader>
                <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
                    {parentCategories && (
                        <button
                            onClick={handledBackClick}
                            className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium cursor-pointer"
                        >
                            <ChevronLeftIcon className="size-4 mr-2">Back</ChevronLeftIcon>
                        </button>
                    )}

                    {currentCategories.map((category) => (
                        <button
                            key={category.slug}
                            onClick={() => handlleCategoryClick(category)}
                            className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium cursor-pointer"
                        >
                            
                            {category.name}
                            {category.subcategories && category.subcategories.length > 0 && (
                                <ChevronRightIcon className="size-4"></ChevronRightIcon>
                            )}
                        </button>
                    ))}
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};
