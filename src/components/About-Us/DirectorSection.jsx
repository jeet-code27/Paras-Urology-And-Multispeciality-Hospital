import Image from 'next/image';

export default function DirectorSection() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-blue-700 to-blue-900">
      
      {/* Left Side - Director Image */}
      <div className="relative min-h-[450px] lg:min-h-[600px] flex items-center justify-center p-8 lg:p-12">
        <div className="relative w-full h-full max-w-md mx-auto">
          <Image
            src="/images/dr-rajkumar.png"
            alt="Dr. Rajkumar Khasgiwala"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </div>

      {/* Right Side - Content */}
      <div className="min-h-[500px] lg:min-h-[600px] flex items-center p-8 md:p-12 lg:p-16">
        <div className="max-w-3xl">
          
          {/* Title */}
          <div className="mb-6">
            <h3 className="text-white text-lg md:text-xl font-light mb-2 pb-2 border-b-2 border-white inline-block">
              Chairman & Managing Director
            </h3>
          </div>

          {/* Director Name */}
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
            Dr. Rajkumar Khasgiwala
          </h2>

          {/* Tagline */}
          <h3 className="text-white text-2xl md:text-3xl font-semibold mb-8 leading-relaxed">
            Pioneering Excellence in Urological Care
          </h3>

          {/* Description */}
          <div className="text-white text-base md:text-lg leading-relaxed space-y-4">
            <p>
              Dr. Rajkumar Khasgiwala, Managing Director of Paras Urology and Multispeciality Hospital, brings over two decades of expertise in urological and andrological care. A resident of Ajmer, Dr. Khasgiwala completed his M.B.B.S. and M.S. from J.L.N Medical College before earning his D.N.B. (Urology) from Sir H.N. Hospital, Mumbai in 2004.
            </p>
            <p>
              After establishing a successful private practice in South Mumbai, he was awarded a fellowship in urology surgery from National University Hospital, Singapore in 2006. Since then, he has become a leading figure in the field of endoscopic urology surgeries, with expertise spanning Endo urology, Laser URS, PCNL, TURP, PCCL, and PCN procedures.
            </p>
            <p>
              Dr. Khasgiwala specializes in managing kidney stones, prostate enlargement, urinary tract diseases, and reconstructive urology for congenital urological abnormalities. He also practices andrology for sexual and infertility problems, and performs complex procedures including dialysis access surgery, CAPD Catheter insertion, and AV fistula formation.
            </p>
            <p className="font-semibold">
              With over 25,000 successful urology surgeries completed in the last 20 years, Dr. Khasgiwala continues to set new standards in urological care, making Paras Hospital a center of excellence in the region.
            </p>
          </div>

        </div>
      </div>

    </section>
  );
}