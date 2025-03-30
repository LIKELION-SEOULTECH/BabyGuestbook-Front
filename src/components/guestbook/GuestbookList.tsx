import GuestbookItem, { GuestbookItemProps } from "./GuestbookItem";

export interface GuestbookListProps {
    items: GuestbookItemProps[];
}

/**
 * 방명록 리스트 뷰 입니다.
 *
 * @param items - GuestbookItem[]
 */
function GuestbookList({ items }: GuestbookListProps) {
    return (
        <div className="flex flex-col gap-12">
            {items.map((item, index) => (
                <GuestbookItem key={index} {...item} />
            ))}
        </div>
    );
}

export default GuestbookList;
