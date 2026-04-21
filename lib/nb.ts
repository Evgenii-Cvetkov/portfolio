/** Replaces spaces after short Russian prepositions/conjunctions with non-breaking spaces. */
export function nb(text: string): string {
  return text.replace(
    /(\s|^)(в|и|а|к|с|о|у|я|но|не|ни|из|до|от|на|по|за|об|со|из-за|из-под|над|под|при|про|без|для|или|это|уже|ещё|чем|как|что|бы|же|ли|то)\s/g,
    '$1$2\u00A0'
  )
}
