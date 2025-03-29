import LikeLion from "@/assets/likelion_univ_orange.svg?react";

function Header() {
    return (
        <div className="self-stretch inline-flex flex-col justify-start items-start gap-4 overflow-hidden">
            <div className="w-32 h-4 relative overflow-hidden">
                <LikeLion className="h-4" />
            </div>
            <div className="flex flex-col justify-start items-start gap-1">
                <div className="justify-start text-PRIMARY text-5xl font-bold font-['SUITE_Variable'] leading-[60px] tracking-wide">
                    아기방명록
                </div>
                <div className="justify-start text-PRIMARY text-2xl font-normal font-['SUITE_Variable'] leading-loose tracking-wide">
                    아기사자들의 마음이 모이는 방명록이에요.
                </div>
            </div>
        </div>
    );
}

export default Header;
