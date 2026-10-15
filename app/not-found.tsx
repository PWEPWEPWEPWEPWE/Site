"use client";

import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@/components/ui/empty";
import { HomeIcon, CompassIcon } from "lucide-react";
import Link from "next/link";

// Hata Buradaydı: Sadece "export" yerine "export default" eklendi
export default function NotFound() {
	return (
		<div className="relative flex min-h-screen w-full items-center justify-center bg-black overflow-hidden px-6">
            {/* AuraX Arka Plan Işığı */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/15 blur-[150px] pointer-events-none rounded-full"></div>

			<Empty className="relative z-10 border-white/10 bg-zinc-950/60 backdrop-blur-xl shadow-[0_0_40px_rgba(168,85,247,0.1)] rounded-[32px]">
				<EmptyHeader>
					<EmptyTitle className="mask-b-from-20% mask-b-to-80% font-extrabold text-9xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400">
						404
					</EmptyTitle>
					<EmptyDescription className="-mt-6 text-nowrap text-gray-400 text-lg">
						Aradığınız sayfa taşınmış <br />
						veya artık mevcut değil.
					</EmptyDescription>
				</EmptyHeader>
				
                <EmptyContent className="mt-4">
					<div className="flex gap-4">
						<Button asChild className="bg-purple-600 hover:bg-purple-500 text-white rounded-xl h-12 px-6 shadow-[0_0_20px_rgba(168,85,247,0.3)] border-0">
							<Link href="/">
								<HomeIcon
								className="size-4 mr-2" data-icon="inline-start" />
								Ana Sayfa
							</Link>
						</Button>

						<Button asChild variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-xl h-12 px-6">
							<Link href="/#services">
								<CompassIcon 
								className="size-4 mr-2 text-purple-400" 
								data-icon="inline-start" />{" "}
								Keşfet
							</Link>
						</Button>
					</div>
				</EmptyContent>
			</Empty>
		</div>
	);
}

