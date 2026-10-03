import SectionHead from "@/components/common/SectionHead";
import Snake from "@/components/game/Snake";
import { snakeFoods } from "@/data/stack";

const Break = () => {
  return (
    <section id="break" className="py-[clamp(80px,12vw,140px)]">
      <div className="wrap">
        <SectionHead title="Take a break" fig="Fig. 07 — Snake.exe" />
        <p className="-mt-7 mb-9 text-[13px] text-white/60">
          Eat my stack, one technology at a time. Don&apos;t bite your own tail.
        </p>
        <Snake foods={snakeFoods} />
      </div>
    </section>
  );
};

export default Break;
