import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BUILD_EPISODES } from "@/data/builds";
import { EpisodeDetailView } from "@/components/studio/EpisodeDetailView";

export function generateStaticParams() {
  return BUILD_EPISODES.map((ep) => ({ slug: ep.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const episode = BUILD_EPISODES.find((ep) => ep.slug === slug);
  if (!episode) return { title: "Episode Not Found" };
  return {
    title: `EP.${episode.number} — ${episode.title}`,
    description: episode.subtitle,
  };
}

export default async function BuildEpisodePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const episode = BUILD_EPISODES.find((ep) => ep.slug === slug);
  if (!episode) notFound();

  return <EpisodeDetailView episode={episode} />;
}
