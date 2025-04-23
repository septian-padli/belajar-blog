import ArticleCard from "@/components/articleCard";


interface RightSideHomeProps {
    className?: string
}

const RightSideHome = ({ className }: RightSideHomeProps) => {
    return (
        <div className={" px-2" + (className ? ` ${className}` : "")}>
            {/* article */}
            <div className="flex flex-col gap-2">
                <ArticleCard name="septian padli" />
                <ArticleCard name="septian padli" />
                <ArticleCard name="septian padli" />

            </div>

        </div>
    );
}

export default RightSideHome;