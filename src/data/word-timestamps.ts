// Word-level timestamps for gongyo lines
// Generated from line-level timestamps with proportional word distribution
// For true word-level accuracy, regenerate via OpenAI Whisper with word_timestamps=True

export interface WordTimestamp {
  word: string;
  start: number;
  end: number;
  multiSyllable: boolean;
}

export type WordTimestampMap = Record<string, WordTimestamp[]>;

export const wordTimestamps: WordTimestampMap = {
  "h0": [
    { word: "Myo", start: 9.45, end: 9.53, multiSyllable: false },
    { word: "ho", start: 9.53, end: 9.58, multiSyllable: false },
    { word: "ren", start: 9.58, end: 9.67, multiSyllable: false },
    { word: "ge", start: 9.67, end: 9.72, multiSyllable: false },
    { word: "kyo.", start: 9.72, end: 9.8, multiSyllable: false }
  ],
  "h1": [
    { word: "Hoben-pon.", start: 9.99, end: 12.57, multiSyllable: true },
    { word: "Dai", start: 12.57, end: 13.54, multiSyllable: false },
    { word: "ni.", start: 13.54, end: 14.18, multiSyllable: false }
  ],
  "h2": [
    { word: "Niji", start: 14.38, end: 15.1, multiSyllable: true },
    { word: "seson.", start: 15.1, end: 16, multiSyllable: true },
    { word: "Ju", start: 16, end: 16.36, multiSyllable: false },
    { word: "sanmai.", start: 16.36, end: 17.44, multiSyllable: true },
    { word: "Anjo", start: 17.44, end: 18.16, multiSyllable: true }
  ],
  "h3": [
    { word: "ni", start: 18.37, end: 18.77, multiSyllable: false },
    { word: "ki.", start: 18.77, end: 19.17, multiSyllable: false },
    { word: "Go", start: 19.17, end: 19.58, multiSyllable: false },
    { word: "shari-hotsu.", start: 19.58, end: 21.59, multiSyllable: true },
    { word: "Sho-", start: 21.59, end: 22.19, multiSyllable: false }
  ],
  "h4": [
    { word: "but", start: 22.39, end: 22.96, multiSyllable: false },
    { word: "chi-e.", start: 22.96, end: 23.71, multiSyllable: false },
    { word: "Jinjin", start: 23.71, end: 24.85, multiSyllable: true },
    { word: "muryo.", start: 24.85, end: 25.79, multiSyllable: true },
    { word: "Go", start: 25.79, end: 26.17, multiSyllable: false }
  ],
  "h5": [
    { word: "chi-e", start: 26.38, end: 27.04, multiSyllable: false },
    { word: "mon.", start: 27.04, end: 27.53, multiSyllable: false },
    { word: "Nange", start: 27.53, end: 28.35, multiSyllable: true },
    { word: "nannyu.", start: 28.35, end: 29.34, multiSyllable: true },
    { word: "Issai", start: 29.34, end: 30.16, multiSyllable: true }
  ],
  "h6": [
    { word: "shomon.", start: 30.36, end: 31.39, multiSyllable: true },
    { word: "Hyaku-shi-butsu.", start: 31.39, end: 33.63, multiSyllable: true },
    { word: "Sho", start: 33.63, end: 34.15, multiSyllable: false }
  ],
  "h7": [
    { word: "fu", start: 34.35, end: 34.7, multiSyllable: false },
    { word: "no", start: 34.7, end: 35.06, multiSyllable: false },
    { word: "chi.", start: 35.06, end: 35.59, multiSyllable: false },
    { word: "Sho-i", start: 35.59, end: 36.29, multiSyllable: false },
    { word: "sha", start: 36.29, end: 36.82, multiSyllable: false },
    { word: "ga.", start: 36.82, end: 37.18, multiSyllable: false },
    { word: "Butsu", start: 37.18, end: 38.06, multiSyllable: true }
  ],
  "h8": [
    { word: "zo", start: 38.26, end: 38.59, multiSyllable: false },
    { word: "shingon.", start: 38.59, end: 39.72, multiSyllable: true },
    { word: "Hyaku", start: 39.72, end: 40.54, multiSyllable: true },
    { word: "sen", start: 40.54, end: 41.02, multiSyllable: false },
    { word: "man", start: 41.02, end: 41.51, multiSyllable: false },
    { word: "noku.", start: 41.51, end: 42.16, multiSyllable: true }
  ],
  "h9": [
    { word: "Mushu", start: 42.36, end: 43.37, multiSyllable: true },
    { word: "sho", start: 43.37, end: 43.97, multiSyllable: false },
    { word: "butsu.", start: 43.97, end: 44.97, multiSyllable: true },
    { word: "Jin", start: 44.97, end: 45.58, multiSyllable: false },
    { word: "gyo", start: 45.58, end: 46.18, multiSyllable: false }
  ],
  "h10": [
    { word: "sho-butsu.", start: 46.38, end: 47.91, multiSyllable: true },
    { word: "Muryo", start: 47.91, end: 48.87, multiSyllable: true },
    { word: "doho.", start: 48.87, end: 49.64, multiSyllable: true },
    { word: "Yumyo", start: 49.64, end: 50.6, multiSyllable: true }
  ],
  "h11": [
    { word: "shojin.", start: 50.8, end: 51.9, multiSyllable: true },
    { word: "Myosho", start: 51.9, end: 53.01, multiSyllable: true },
    { word: "fu", start: 53.01, end: 53.37, multiSyllable: false },
    { word: "mon.", start: 53.37, end: 53.92, multiSyllable: false },
    { word: "Joju", start: 53.92, end: 54.66, multiSyllable: true }
  ],
  "h12": [
    { word: "jinjin.", start: 54.86, end: 55.93, multiSyllable: true },
    { word: "Mi-zo-u", start: 55.93, end: 56.83, multiSyllable: true },
    { word: "ho.", start: 56.83, end: 57.19, multiSyllable: false },
    { word: "Zui", start: 57.19, end: 57.72, multiSyllable: false },
    { word: "gi", start: 57.72, end: 58.08, multiSyllable: false },
    { word: "sho", start: 58.08, end: 58.62, multiSyllable: false }
  ],
  "h13": [
    { word: "setsu.", start: 58.82, end: 59.62, multiSyllable: true },
    { word: "Ishu", start: 59.62, end: 60.26, multiSyllable: true },
    { word: "nange.", start: 60.26, end: 61.07, multiSyllable: true },
    { word: "Shari-hotsu.", start: 61.07, end: 62.67, multiSyllable: true }
  ],
  "h14": [
    { word: "Go", start: 62.87, end: 63.17, multiSyllable: false },
    { word: "ju", start: 63.17, end: 63.47, multiSyllable: false },
    { word: "jo-butsu", start: 63.47, end: 64.52, multiSyllable: true },
    { word: "irai.", start: 64.52, end: 65.13, multiSyllable: true },
    { word: "Shuju", start: 65.13, end: 65.88, multiSyllable: true },
    { word: "innen.", start: 65.88, end: 66.63, multiSyllable: true }
  ],
  "h15": [
    { word: "Shuju", start: 66.83, end: 67.7, multiSyllable: true },
    { word: "hiyu.", start: 67.7, end: 68.4, multiSyllable: false },
    { word: "Ko", start: 68.4, end: 68.75, multiSyllable: false },
    { word: "en", start: 68.75, end: 69.1, multiSyllable: false },
    { word: "gonkyo.", start: 69.1, end: 70.14, multiSyllable: true },
    { word: "Mu", start: 70.14, end: 70.49, multiSyllable: false }
  ],
  "h16": [
    { word: "shu", start: 70.69, end: 71.19, multiSyllable: false },
    { word: "hoben.", start: 71.19, end: 72.04, multiSyllable: true },
    { word: "Indo", start: 72.04, end: 72.71, multiSyllable: true },
    { word: "shujo.", start: 72.71, end: 73.55, multiSyllable: true },
    { word: "Ryo", start: 73.55, end: 74.05, multiSyllable: false },
    { word: "ri", start: 74.05, end: 74.39, multiSyllable: false }
  ],
  "h17": [
    { word: "sho", start: 74.58, end: 75.07, multiSyllable: false },
    { word: "jaku.", start: 75.07, end: 75.73, multiSyllable: true },
    { word: "Sho-i", start: 75.73, end: 76.38, multiSyllable: false },
    { word: "sha", start: 76.38, end: 76.87, multiSyllable: false },
    { word: "ga.", start: 76.87, end: 77.2, multiSyllable: false },
    { word: "Nyorai", start: 77.2, end: 78.18, multiSyllable: true }
  ],
  "h18": [
    { word: "hoben.", start: 78.38, end: 79.19, multiSyllable: true },
    { word: "Chi-ken", start: 79.19, end: 80.17, multiSyllable: true },
    { word: "hara-mitsu.", start: 80.17, end: 81.63, multiSyllable: true },
    { word: "Kai", start: 81.63, end: 82.12, multiSyllable: false }
  ],
  "h19": [
    { word: "i", start: 82.32, end: 82.49, multiSyllable: false },
    { word: "gu-soku.", start: 82.49, end: 83.5, multiSyllable: true },
    { word: "Shari-hotsu.", start: 83.5, end: 85.2, multiSyllable: true },
    { word: "Nyorai", start: 85.2, end: 86.21, multiSyllable: true }
  ],
  "h20": [
    { word: "chi-ken.", start: 86.4, end: 87.56, multiSyllable: true },
    { word: "Kodai", start: 87.56, end: 88.52, multiSyllable: true },
    { word: "jinnon.", start: 88.52, end: 89.68, multiSyllable: true },
    { word: "Muryo", start: 89.68, end: 90.64, multiSyllable: true }
  ],
  "h21": [
    { word: "muge.", start: 90.84, end: 91.64, multiSyllable: true },
    { word: "Riki.", start: 91.64, end: 92.45, multiSyllable: true },
    { word: "Mu-sho-i.", start: 92.45, end: 93.65, multiSyllable: true },
    { word: "Zenjo.", start: 93.65, end: 94.66, multiSyllable: true }
  ],
  "h22": [
    { word: "Gedas.", start: 94.85, end: 95.83, multiSyllable: true },
    { word: "Sanmai.", start: 95.83, end: 97.01, multiSyllable: true },
    { word: "Jin", start: 97.01, end: 97.59, multiSyllable: false },
    { word: "nyu", start: 97.59, end: 98.18, multiSyllable: false },
    { word: "musai.", start: 98.18, end: 99.16, multiSyllable: true }
  ],
  "h23": [
    { word: "Joju", start: 99.35, end: 100.08, multiSyllable: true },
    { word: "issai.", start: 100.08, end: 100.98, multiSyllable: true },
    { word: "Mi-zo-u", start: 100.98, end: 101.89, multiSyllable: true },
    { word: "ho.", start: 101.89, end: 102.25, multiSyllable: false },
    { word: "Shari-", start: 102.25, end: 103.16, multiSyllable: true }
  ],
  "h24": [
    { word: "hotsu.", start: 103.35, end: 104.26, multiSyllable: true },
    { word: "Nyorai", start: 104.26, end: 105.35, multiSyllable: true },
    { word: "no.", start: 105.35, end: 105.71, multiSyllable: false },
    { word: "Shuju", start: 105.71, end: 106.62, multiSyllable: true },
    { word: "fun-", start: 106.62, end: 107.16, multiSyllable: false }
  ],
  "h25": [
    { word: "betsu.", start: 107.36, end: 108.35, multiSyllable: true },
    { word: "Gyo", start: 108.35, end: 108.94, multiSyllable: false },
    { word: "ses", start: 108.94, end: 109.54, multiSyllable: false },
    { word: "sho", start: 109.54, end: 110.13, multiSyllable: false },
    { word: "ho.", start: 110.13, end: 110.53, multiSyllable: false },
    { word: "Gon-", start: 110.53, end: 111.12, multiSyllable: false }
  ],
  "h26": [
    { word: "ji", start: 111.32, end: 111.76, multiSyllable: false },
    { word: "nyunan.", start: 111.76, end: 113.1, multiSyllable: true },
    { word: "Ekka", start: 113.1, end: 113.99, multiSyllable: true },
    { word: "shushin.", start: 113.99, end: 115.54, multiSyllable: true },
    { word: "Shari-", start: 115.54, end: 116.65, multiSyllable: true }
  ],
  "h27": [
    { word: "hotsu.", start: 116.84, end: 117.75, multiSyllable: true },
    { word: "Shu", start: 117.75, end: 118.29, multiSyllable: false },
    { word: "yo", start: 118.29, end: 118.65, multiSyllable: false },
    { word: "gon", start: 118.65, end: 119.2, multiSyllable: false },
    { word: "shi.", start: 119.2, end: 119.74, multiSyllable: false },
    { word: "Muryo", start: 119.74, end: 120.65, multiSyllable: true }
  ],
  "h28": [
    { word: "muhen.", start: 120.85, end: 121.75, multiSyllable: true },
    { word: "Mi-zo-u", start: 121.75, end: 122.66, multiSyllable: true },
    { word: "ho.", start: 122.66, end: 123.02, multiSyllable: false },
    { word: "Bus", start: 123.02, end: 123.56, multiSyllable: false },
    { word: "shitsu", start: 123.56, end: 124.65, multiSyllable: true }
  ],
  "h29": [
    { word: "joju.", start: 124.85, end: 125.44, multiSyllable: true },
    { word: "Shi", start: 125.44, end: 125.89, multiSyllable: false },
    { word: "shari-hotsu.", start: 125.89, end: 127.36, multiSyllable: true },
    { word: "Fu", start: 127.36, end: 127.66, multiSyllable: false },
    { word: "shu", start: 127.66, end: 128.1, multiSyllable: false },
    { word: "bu", start: 128.1, end: 128.4, multiSyllable: false }
  ],
  "h30": [
    { word: "setsu.", start: 128.6, end: 129.49, multiSyllable: true },
    { word: "Sho-i", start: 129.49, end: 130.21, multiSyllable: false },
    { word: "sha", start: 130.21, end: 130.74, multiSyllable: false },
    { word: "ga.", start: 130.74, end: 131.1, multiSyllable: false },
    { word: "Bus", start: 131.1, end: 131.63, multiSyllable: false },
    { word: "sho", start: 131.63, end: 132.17, multiSyllable: false }
  ],
  "h31": [
    { word: "joju.", start: 132.37, end: 133.06, multiSyllable: true },
    { word: "Dai", start: 133.06, end: 133.59, multiSyllable: false },
    { word: "ichi", start: 133.59, end: 134.28, multiSyllable: true },
    { word: "ke-u.", start: 134.28, end: 134.8, multiSyllable: false },
    { word: "Nange", start: 134.8, end: 135.67, multiSyllable: true },
    { word: "shi", start: 135.67, end: 136.19, multiSyllable: false }
  ],
  "h32": [
    { word: "ho.", start: 136.39, end: 136.73, multiSyllable: false },
    { word: "Yui", start: 136.73, end: 137.25, multiSyllable: false },
    { word: "butsu", start: 137.25, end: 138.1, multiSyllable: true },
    { word: "yo", start: 138.1, end: 138.45, multiSyllable: false },
    { word: "butsu.", start: 138.45, end: 139.3, multiSyllable: true },
    { word: "Nai", start: 139.3, end: 139.82, multiSyllable: false },
    { word: "no", start: 139.82, end: 140.16, multiSyllable: false }
  ],
  "h33": [
    { word: "kujin.", start: 140.36, end: 141.79, multiSyllable: true },
    { word: "Shoho", start: 141.79, end: 143.23, multiSyllable: true },
    { word: "jisso.", start: 143.23, end: 144.66, multiSyllable: true }
  ],
  "h34": [
    { word: "Sho-i", start: 144.85, end: 145.93, multiSyllable: false },
    { word: "shoho.", start: 145.93, end: 147.28, multiSyllable: true },
    { word: "Nyo", start: 147.28, end: 148.09, multiSyllable: false },
    { word: "ze", start: 148.09, end: 148.63, multiSyllable: false },
    { word: "so.", start: 148.63, end: 149.17, multiSyllable: false }
  ],
  "h35": [
    { word: "Nyo", start: 149.37, end: 150.05, multiSyllable: false },
    { word: "ze", start: 150.05, end: 150.51, multiSyllable: false },
    { word: "sho.", start: 150.51, end: 151.19, multiSyllable: false },
    { word: "Nyo", start: 151.19, end: 151.87, multiSyllable: false },
    { word: "ze", start: 151.87, end: 152.33, multiSyllable: false },
    { word: "tai.", start: 152.33, end: 153.01, multiSyllable: false }
  ],
  "h36": [
    { word: "Nyo", start: 153.21, end: 153.95, multiSyllable: false },
    { word: "ze", start: 153.95, end: 154.45, multiSyllable: false },
    { word: "riki.", start: 154.45, end: 155.44, multiSyllable: true },
    { word: "Nyo", start: 155.44, end: 156.18, multiSyllable: false },
    { word: "ze", start: 156.18, end: 156.68, multiSyllable: false },
    { word: "sa.", start: 156.68, end: 157.17, multiSyllable: false }
  ],
  "h37": [
    { word: "Nyo", start: 157.37, end: 158.18, multiSyllable: false },
    { word: "ze", start: 158.18, end: 158.72, multiSyllable: false },
    { word: "in.", start: 158.72, end: 159.26, multiSyllable: false },
    { word: "Nyo", start: 159.26, end: 160.07, multiSyllable: false },
    { word: "ze", start: 160.07, end: 160.61, multiSyllable: false },
    { word: "en.", start: 160.61, end: 161.15, multiSyllable: false }
  ],
  "h38": [
    { word: "Nyo", start: 161.35, end: 162.16, multiSyllable: false },
    { word: "ze", start: 162.16, end: 162.71, multiSyllable: false },
    { word: "ka.", start: 162.71, end: 163.25, multiSyllable: false },
    { word: "Nyo", start: 163.25, end: 164.06, multiSyllable: false },
    { word: "ze", start: 164.06, end: 164.61, multiSyllable: false },
    { word: "ho.", start: 164.61, end: 165.15, multiSyllable: false }
  ],
  "h39": [
    { word: "Nyo", start: 165.35, end: 166.07, multiSyllable: false },
    { word: "ze", start: 166.07, end: 166.55, multiSyllable: false },
    { word: "honmak", start: 166.55, end: 167.98, multiSyllable: true },
    { word: "kukyo", start: 167.98, end: 169.18, multiSyllable: true },
    { word: "to.", start: 169.18, end: 169.66, multiSyllable: false }
  ],
  "h40": [
    { word: "Sho-i", start: 169.86, end: 170.93, multiSyllable: false },
    { word: "shoho.", start: 170.93, end: 172.26, multiSyllable: true },
    { word: "Nyo", start: 172.26, end: 173.06, multiSyllable: false },
    { word: "ze", start: 173.06, end: 173.59, multiSyllable: false },
    { word: "so.", start: 173.59, end: 174.12, multiSyllable: false }
  ],
  "h41": [
    { word: "Nyo", start: 174.32, end: 175.04, multiSyllable: false },
    { word: "ze", start: 175.04, end: 175.52, multiSyllable: false },
    { word: "sho.", start: 175.52, end: 176.24, multiSyllable: false },
    { word: "Nyo", start: 176.24, end: 176.95, multiSyllable: false },
    { word: "ze", start: 176.95, end: 177.43, multiSyllable: false },
    { word: "tai.", start: 177.43, end: 178.15, multiSyllable: false }
  ],
  "h42": [
    { word: "Nyo", start: 178.35, end: 179.16, multiSyllable: false },
    { word: "ze", start: 179.16, end: 179.7, multiSyllable: false },
    { word: "riki.", start: 179.7, end: 180.77, multiSyllable: true },
    { word: "Nyo", start: 180.77, end: 181.58, multiSyllable: false },
    { word: "ze", start: 181.58, end: 182.12, multiSyllable: false },
    { word: "sa.", start: 182.12, end: 182.66, multiSyllable: false }
  ],
  "h43": [
    { word: "Nyo", start: 182.86, end: 183.78, multiSyllable: false },
    { word: "ze", start: 183.78, end: 184.4, multiSyllable: false },
    { word: "in.", start: 184.4, end: 185.01, multiSyllable: false },
    { word: "Nyo", start: 185.01, end: 185.93, multiSyllable: false },
    { word: "ze", start: 185.93, end: 186.55, multiSyllable: false },
    { word: "en.", start: 186.55, end: 187.16, multiSyllable: false }
  ],
  "h44": [
    { word: "Nyo", start: 187.36, end: 188.13, multiSyllable: false },
    { word: "ze", start: 188.13, end: 188.64, multiSyllable: false },
    { word: "ka.", start: 188.64, end: 189.15, multiSyllable: false },
    { word: "Nyo", start: 189.15, end: 189.92, multiSyllable: false },
    { word: "ze", start: 189.92, end: 190.43, multiSyllable: false },
    { word: "ho.", start: 190.43, end: 190.94, multiSyllable: false }
  ],
  "h45": [
    { word: "Nyo", start: 191.14, end: 191.87, multiSyllable: false },
    { word: "ze", start: 191.87, end: 192.35, multiSyllable: false },
    { word: "honmak", start: 192.35, end: 193.81, multiSyllable: true },
    { word: "kukyo", start: 193.81, end: 195.02, multiSyllable: true },
    { word: "to.", start: 195.02, end: 195.51, multiSyllable: false }
  ],
  "j0": [
    { word: "Myo", start: 198.34, end: 198.42, multiSyllable: false },
    { word: "ho", start: 198.42, end: 198.47, multiSyllable: false },
    { word: "ren", start: 198.47, end: 198.56, multiSyllable: false },
    { word: "ge", start: 198.56, end: 198.61, multiSyllable: false },
    { word: "kyo.", start: 198.61, end: 198.69, multiSyllable: false }
  ],
  "j1": [
    { word: "Nyorai", start: 198.89, end: 199.49, multiSyllable: true },
    { word: "ju-ryo-hon.", start: 199.49, end: 200.3, multiSyllable: true },
    { word: "Dai", start: 200.3, end: 200.6, multiSyllable: false },
    { word: "ju-roku.", start: 200.6, end: 201.2, multiSyllable: true }
  ],
  "j2": [
    { word: "Ji", start: 201.4, end: 201.73, multiSyllable: false },
    { word: "ga", start: 201.73, end: 202.05, multiSyllable: false },
    { word: "toku", start: 202.05, end: 202.71, multiSyllable: true },
    { word: "bur", start: 202.71, end: 203.2, multiSyllable: false },
    { word: "rai.", start: 203.2, end: 203.69, multiSyllable: false }
  ],
  "j3": [
    { word: "Sho", start: 203.89, end: 204.29, multiSyllable: false },
    { word: "kyo", start: 204.29, end: 204.69, multiSyllable: false },
    { word: "sho", start: 204.69, end: 205.08, multiSyllable: false },
    { word: "kosshu.", start: 205.08, end: 205.88, multiSyllable: true }
  ],
  "j4": [
    { word: "Muryo", start: 206.08, end: 206.73, multiSyllable: true },
    { word: "hyaku", start: 206.73, end: 207.38, multiSyllable: true },
    { word: "sen", start: 207.38, end: 207.77, multiSyllable: false },
    { word: "man.", start: 207.77, end: 208.16, multiSyllable: false }
  ],
  "j5": [
    { word: "Oku", start: 208.36, end: 209.05, multiSyllable: true },
    { word: "sai", start: 209.05, end: 209.75, multiSyllable: false },
    { word: "asogi.", start: 209.75, end: 210.9, multiSyllable: true }
  ],
  "j6": [
    { word: "Jo", start: 211.1, end: 211.52, multiSyllable: false },
    { word: "seppo", start: 211.52, end: 212.56, multiSyllable: true },
    { word: "kyoke.", start: 212.56, end: 213.6, multiSyllable: true }
  ],
  "j7": [
    { word: "Mushu", start: 213.8, end: 214.7, multiSyllable: true },
    { word: "oku", start: 214.7, end: 215.24, multiSyllable: true },
    { word: "shujo.", start: 215.24, end: 216.14, multiSyllable: true }
  ],
  "j8": [
    { word: "Ryo", start: 216.34, end: 216.78, multiSyllable: false },
    { word: "nyu", start: 216.78, end: 217.22, multiSyllable: false },
    { word: "o", start: 217.22, end: 217.37, multiSyllable: false },
    { word: "butsu-do.", start: 217.37, end: 218.4, multiSyllable: true }
  ],
  "j9": [
    { word: "Nirai", start: 218.6, end: 219.46, multiSyllable: true },
    { word: "muryo", start: 219.46, end: 220.32, multiSyllable: true },
    { word: "ko.", start: 220.32, end: 220.66, multiSyllable: false }
  ],
  "j10": [
    { word: "I", start: 220.86, end: 221.19, multiSyllable: false },
    { word: "do", start: 221.19, end: 221.84, multiSyllable: false },
    { word: "shujo", start: 221.84, end: 223.48, multiSyllable: true },
    { word: "ko.", start: 223.48, end: 224.14, multiSyllable: false }
  ],
  "j11": [
    { word: "Hoben", start: 224.34, end: 225.23, multiSyllable: true },
    { word: "gen", start: 225.23, end: 225.77, multiSyllable: false },
    { word: "nehan.", start: 225.77, end: 226.66, multiSyllable: true }
  ],
  "j12": [
    { word: "Ni", start: 226.86, end: 227.27, multiSyllable: false },
    { word: "jitsu", start: 227.27, end: 228.3, multiSyllable: true },
    { word: "fu", start: 228.3, end: 228.72, multiSyllable: false },
    { word: "metsu-do.", start: 228.72, end: 230.16, multiSyllable: true }
  ],
  "j13": [
    { word: "Jo", start: 230.36, end: 230.74, multiSyllable: false },
    { word: "ju", start: 230.74, end: 231.12, multiSyllable: false },
    { word: "shi", start: 231.12, end: 231.69, multiSyllable: false },
    { word: "seppo.", start: 231.69, end: 232.64, multiSyllable: true }
  ],
  "j14": [
    { word: "Ga", start: 232.84, end: 233.3, multiSyllable: false },
    { word: "jo", start: 233.3, end: 233.77, multiSyllable: false },
    { word: "ju", start: 233.77, end: 234.23, multiSyllable: false },
    { word: "o", start: 234.23, end: 234.46, multiSyllable: false },
    { word: "shi.", start: 234.46, end: 235.16, multiSyllable: false }
  ],
  "j15": [
    { word: "I", start: 235.36, end: 235.54, multiSyllable: false },
    { word: "sho", start: 235.54, end: 236.07, multiSyllable: false },
    { word: "jin-zu-riki.", start: 236.07, end: 237.66, multiSyllable: true }
  ],
  "j16": [
    { word: "Ryo", start: 237.86, end: 238.38, multiSyllable: false },
    { word: "tendo", start: 238.38, end: 239.24, multiSyllable: true },
    { word: "shujo.", start: 239.24, end: 240.1, multiSyllable: true }
  ],
  "j17": [
    { word: "Sui", start: 240.3, end: 240.74, multiSyllable: false },
    { word: "gon", start: 240.74, end: 241.19, multiSyllable: false },
    { word: "ni", start: 241.19, end: 241.48, multiSyllable: false },
    { word: "fu", start: 241.48, end: 241.78, multiSyllable: false },
    { word: "ken.", start: 241.78, end: 242.22, multiSyllable: false }
  ],
  "j18": [
    { word: "Shu", start: 242.42, end: 242.86, multiSyllable: false },
    { word: "ken", start: 242.86, end: 243.29, multiSyllable: false },
    { word: "ga", start: 243.29, end: 243.58, multiSyllable: false },
    { word: "metsu-do.", start: 243.58, end: 244.6, multiSyllable: true }
  ],
  "j19": [
    { word: "Ko", start: 244.8, end: 245.22, multiSyllable: false },
    { word: "kuyo", start: 245.22, end: 246.06, multiSyllable: false },
    { word: "shari.", start: 246.06, end: 247.11, multiSyllable: true }
  ],
  "j20": [
    { word: "Gen", start: 247.31, end: 247.88, multiSyllable: false },
    { word: "kai", start: 247.88, end: 248.46, multiSyllable: false },
    { word: "e", start: 248.46, end: 248.65, multiSyllable: false },
    { word: "renbo.", start: 248.65, end: 249.6, multiSyllable: true }
  ],
  "j21": [
    { word: "Ni", start: 249.8, end: 250.09, multiSyllable: false },
    { word: "sho", start: 250.09, end: 250.52, multiSyllable: false },
    { word: "katsu-go", start: 250.52, end: 251.53, multiSyllable: true },
    { word: "shin.", start: 251.53, end: 252.11, multiSyllable: false }
  ],
  "j22": [
    { word: "Shujo", start: 252.31, end: 253.09, multiSyllable: true },
    { word: "ki", start: 253.09, end: 253.4, multiSyllable: false },
    { word: "shin-buku.", start: 253.4, end: 254.64, multiSyllable: true }
  ],
  "j23": [
    { word: "Shichi-jiki", start: 254.84, end: 256.05, multiSyllable: true },
    { word: "i", start: 256.05, end: 256.17, multiSyllable: false },
    { word: "nyunan.", start: 256.17, end: 256.89, multiSyllable: true }
  ],
  "j24": [
    { word: "Isshin", start: 257.09, end: 257.99, multiSyllable: true },
    { word: "yok", start: 257.99, end: 258.45, multiSyllable: false },
    { word: "ken", start: 258.45, end: 258.9, multiSyllable: false },
    { word: "butsu.", start: 258.9, end: 259.65, multiSyllable: true }
  ],
  "j25": [
    { word: "Fu", start: 259.86, end: 260.11, multiSyllable: false },
    { word: "ji", start: 260.11, end: 260.37, multiSyllable: false },
    { word: "shaku", start: 260.37, end: 261, multiSyllable: true },
    { word: "shinmyo.", start: 261, end: 261.88, multiSyllable: true }
  ],
  "j26": [
    { word: "Ji", start: 262.08, end: 262.51, multiSyllable: false },
    { word: "ga", start: 262.51, end: 262.94, multiSyllable: false },
    { word: "gyu", start: 262.94, end: 263.59, multiSyllable: false },
    { word: "shuso.", start: 263.59, end: 264.66, multiSyllable: true }
  ],
  "j27": [
    { word: "Ku", start: 264.86, end: 265.15, multiSyllable: false },
    { word: "shutsu", start: 265.15, end: 266.02, multiSyllable: true },
    { word: "ryojusen.", start: 266.02, end: 267.17, multiSyllable: true }
  ],
  "j28": [
    { word: "Ga", start: 267.38, end: 267.89, multiSyllable: false },
    { word: "ji", start: 267.89, end: 268.39, multiSyllable: false },
    { word: "go", start: 268.39, end: 268.9, multiSyllable: false },
    { word: "shujo.", start: 268.9, end: 270.17, multiSyllable: true }
  ],
  "j29": [
    { word: "Jo", start: 270.37, end: 270.68, multiSyllable: false },
    { word: "zai", start: 270.68, end: 271.14, multiSyllable: false },
    { word: "shi", start: 271.14, end: 271.61, multiSyllable: false },
    { word: "fu-metsu.", start: 271.61, end: 272.69, multiSyllable: true }
  ],
  "j30": [
    { word: "I", start: 272.9, end: 273.11, multiSyllable: false },
    { word: "ho-ben-rik", start: 273.11, end: 274.77, multiSyllable: true },
    { word: "ko.", start: 274.77, end: 275.18, multiSyllable: false }
  ],
  "j31": [
    { word: "Gen", start: 275.38, end: 275.81, multiSyllable: false },
    { word: "u", start: 275.81, end: 275.95, multiSyllable: false },
    { word: "metsu", start: 275.95, end: 276.67, multiSyllable: true },
    { word: "fu-metsu.", start: 276.67, end: 277.67, multiSyllable: true }
  ],
  "j32": [
    { word: "Yo-koku", start: 277.87, end: 279, multiSyllable: true },
    { word: "u", start: 279, end: 279.18, multiSyllable: false },
    { word: "shujo.", start: 279.18, end: 280.12, multiSyllable: true }
  ],
  "j33": [
    { word: "Kugyo", start: 280.33, end: 281.09, multiSyllable: true },
    { word: "shingyo", start: 281.09, end: 282.16, multiSyllable: true },
    { word: "sha.", start: 282.16, end: 282.62, multiSyllable: false }
  ],
  "j34": [
    { word: "Ga", start: 282.82, end: 283.29, multiSyllable: false },
    { word: "bu", start: 283.29, end: 283.76, multiSyllable: false },
    { word: "o", start: 283.76, end: 284, multiSyllable: false },
    { word: "hi", start: 284, end: 284.47, multiSyllable: false },
    { word: "chu.", start: 284.47, end: 285.18, multiSyllable: false }
  ],
  "j35": [
    { word: "I", start: 285.38, end: 285.57, multiSyllable: false },
    { word: "setsu", start: 285.57, end: 286.51, multiSyllable: true },
    { word: "mujo", start: 286.51, end: 287.26, multiSyllable: true },
    { word: "ho.", start: 287.26, end: 287.64, multiSyllable: false }
  ],
  "j36": [
    { word: "Nyoto", start: 287.85, end: 288.72, multiSyllable: true },
    { word: "fu", start: 288.72, end: 289.06, multiSyllable: false },
    { word: "mon", start: 289.06, end: 289.58, multiSyllable: false },
    { word: "shi.", start: 289.58, end: 290.1, multiSyllable: false }
  ],
  "j37": [
    { word: "Tan", start: 290.31, end: 290.92, multiSyllable: false },
    { word: "ni", start: 290.92, end: 291.33, multiSyllable: false },
    { word: "ga", start: 291.33, end: 291.73, multiSyllable: false },
    { word: "metsu-do.", start: 291.73, end: 293.16, multiSyllable: true }
  ],
  "j38": [
    { word: "Ga", start: 293.36, end: 293.7, multiSyllable: false },
    { word: "ken", start: 293.7, end: 294.22, multiSyllable: false },
    { word: "sho", start: 294.22, end: 294.74, multiSyllable: false },
    { word: "shujo.", start: 294.74, end: 295.6, multiSyllable: true }
  ],
  "j39": [
    { word: "Motsu-zai", start: 295.8, end: 297.42, multiSyllable: true },
    { word: "o", start: 297.42, end: 297.63, multiSyllable: false },
    { word: "kukai.", start: 297.63, end: 298.64, multiSyllable: true }
  ],
  "j40": [
    { word: "Ko", start: 298.84, end: 299.22, multiSyllable: false },
    { word: "fu", start: 299.22, end: 299.6, multiSyllable: false },
    { word: "i", start: 299.6, end: 299.79, multiSyllable: false },
    { word: "gen", start: 299.79, end: 300.36, multiSyllable: false },
    { word: "shin.", start: 300.36, end: 301.12, multiSyllable: false }
  ],
  "j41": [
    { word: "Ryo", start: 301.32, end: 301.79, multiSyllable: false },
    { word: "go", start: 301.79, end: 302.1, multiSyllable: false },
    { word: "sho", start: 302.1, end: 302.57, multiSyllable: false },
    { word: "katsu-go.", start: 302.57, end: 303.66, multiSyllable: true }
  ],
  "j42": [
    { word: "In", start: 303.86, end: 304.37, multiSyllable: false },
    { word: "go", start: 304.37, end: 304.87, multiSyllable: false },
    { word: "shin", start: 304.87, end: 305.88, multiSyllable: false },
    { word: "renbo.", start: 305.88, end: 307.15, multiSyllable: true }
  ],
  "j43": [
    { word: "Nai", start: 307.35, end: 307.81, multiSyllable: false },
    { word: "shutsu", start: 307.81, end: 308.72, multiSyllable: true },
    { word: "i", start: 308.72, end: 308.88, multiSyllable: false },
    { word: "seppo.", start: 308.88, end: 309.64, multiSyllable: true }
  ],
  "j44": [
    { word: "Jin-zu-riki", start: 309.85, end: 311.31, multiSyllable: true },
    { word: "nyo", start: 311.31, end: 311.8, multiSyllable: false },
    { word: "ze.", start: 311.8, end: 312.12, multiSyllable: false }
  ],
  "j45": [
    { word: "O", start: 312.33, end: 312.62, multiSyllable: false },
    { word: "asogi", start: 312.62, end: 314.09, multiSyllable: true },
    { word: "ko.", start: 314.09, end: 314.67, multiSyllable: false }
  ],
  "j46": [
    { word: "Jo", start: 314.87, end: 315.22, multiSyllable: false },
    { word: "zai", start: 315.22, end: 315.74, multiSyllable: false },
    { word: "ryojusen.", start: 315.74, end: 317.14, multiSyllable: true }
  ],
  "j47": [
    { word: "Gyu", start: 317.34, end: 317.87, multiSyllable: false },
    { word: "yo", start: 317.87, end: 318.22, multiSyllable: false },
    { word: "sho", start: 318.22, end: 318.75, multiSyllable: false },
    { word: "jusho.", start: 318.75, end: 319.63, multiSyllable: true }
  ],
  "j48": [
    { word: "Shujo", start: 319.83, end: 320.72, multiSyllable: true },
    { word: "ken", start: 320.72, end: 321.25, multiSyllable: false },
    { word: "ko", start: 321.25, end: 321.61, multiSyllable: false },
    { word: "jin.", start: 321.61, end: 322.14, multiSyllable: false }
  ],
  "j49": [
    { word: "Dai", start: 322.35, end: 322.83, multiSyllable: false },
    { word: "ka", start: 322.83, end: 323.15, multiSyllable: false },
    { word: "sho", start: 323.15, end: 323.64, multiSyllable: false },
    { word: "sho", start: 323.64, end: 324.12, multiSyllable: false },
    { word: "ji.", start: 324.12, end: 324.44, multiSyllable: false }
  ],
  "j50": [
    { word: "Ga", start: 324.65, end: 325.07, multiSyllable: false },
    { word: "shi", start: 325.07, end: 325.71, multiSyllable: false },
    { word: "do", start: 325.71, end: 326.13, multiSyllable: false },
    { word: "annon.", start: 326.13, end: 327.19, multiSyllable: true }
  ],
  "j51": [
    { word: "Tennin", start: 327.39, end: 328.42, multiSyllable: true },
    { word: "jo", start: 328.42, end: 328.77, multiSyllable: false },
    { word: "juman.", start: 328.77, end: 329.63, multiSyllable: true }
  ],
  "j52": [
    { word: "Onrin", start: 329.83, end: 330.57, multiSyllable: true },
    { word: "sho", start: 330.57, end: 331.02, multiSyllable: false },
    { word: "do-kaku.", start: 331.02, end: 331.91, multiSyllable: true }
  ],
  "j53": [
    { word: "Shuju", start: 332.11, end: 332.91, multiSyllable: true },
    { word: "ho", start: 332.91, end: 333.22, multiSyllable: false },
    { word: "shogon.", start: 333.22, end: 334.18, multiSyllable: true }
  ],
  "j54": [
    { word: "Hoju", start: 334.38, end: 335.29, multiSyllable: true },
    { word: "ta", start: 335.29, end: 335.75, multiSyllable: false },
    { word: "keka.", start: 335.75, end: 336.66, multiSyllable: true }
  ],
  "j55": [
    { word: "Shujo", start: 336.86, end: 337.77, multiSyllable: true },
    { word: "sho", start: 337.77, end: 338.32, multiSyllable: false },
    { word: "yu-raku.", start: 338.32, end: 339.42, multiSyllable: true }
  ],
  "j56": [
    { word: "Shoten", start: 339.62, end: 340.39, multiSyllable: true },
    { word: "gyaku", start: 340.39, end: 341.02, multiSyllable: true },
    { word: "tenku.", start: 341.02, end: 341.66, multiSyllable: true }
  ],
  "j57": [
    { word: "Jo", start: 341.86, end: 342.18, multiSyllable: false },
    { word: "sas", start: 342.18, end: 342.66, multiSyllable: false },
    { word: "shu", start: 342.66, end: 343.14, multiSyllable: false },
    { word: "gi-gaku.", start: 343.14, end: 344.1, multiSyllable: true }
  ],
  "j58": [
    { word: "U", start: 344.3, end: 344.53, multiSyllable: false },
    { word: "mandara", start: 344.53, end: 346.15, multiSyllable: true },
    { word: "ke.", start: 346.15, end: 346.61, multiSyllable: false }
  ],
  "j59": [
    { word: "San", start: 346.82, end: 347.23, multiSyllable: false },
    { word: "butsu", start: 347.23, end: 347.93, multiSyllable: true },
    { word: "gyu", start: 347.93, end: 348.34, multiSyllable: false },
    { word: "daishu.", start: 348.34, end: 349.17, multiSyllable: true }
  ],
  "j60": [
    { word: "Ga", start: 349.37, end: 349.83, multiSyllable: false },
    { word: "jodo", start: 349.83, end: 350.74, multiSyllable: true },
    { word: "fu", start: 350.74, end: 351.2, multiSyllable: false },
    { word: "ki.", start: 351.2, end: 351.66, multiSyllable: false }
  ],
  "j61": [
    { word: "Ni", start: 351.86, end: 352.19, multiSyllable: false },
    { word: "shu", start: 352.19, end: 352.67, multiSyllable: false },
    { word: "ken", start: 352.67, end: 353.16, multiSyllable: false },
    { word: "sho", start: 353.16, end: 353.65, multiSyllable: false },
    { word: "jin.", start: 353.65, end: 354.14, multiSyllable: false }
  ],
  "j62": [
    { word: "Ufu", start: 354.34, end: 355.34, multiSyllable: true },
    { word: "sho", start: 355.34, end: 356.34, multiSyllable: false },
    { word: "kuno.", start: 356.34, end: 357.67, multiSyllable: true }
  ],
  "j63": [
    { word: "Nyo", start: 357.87, end: 358.3, multiSyllable: false },
    { word: "ze", start: 358.3, end: 358.58, multiSyllable: false },
    { word: "shitsu", start: 358.58, end: 359.43, multiSyllable: true },
    { word: "juman.", start: 359.43, end: 360.14, multiSyllable: true }
  ],
  "j64": [
    { word: "Ze", start: 360.34, end: 360.73, multiSyllable: false },
    { word: "sho", start: 360.73, end: 361.31, multiSyllable: false },
    { word: "zai", start: 361.31, end: 361.89, multiSyllable: false },
    { word: "shujo.", start: 361.89, end: 362.86, multiSyllable: true }
  ],
  "j65": [
    { word: "I", start: 363.07, end: 363.3, multiSyllable: false },
    { word: "aku-go", start: 363.3, end: 364.46, multiSyllable: true },
    { word: "innen.", start: 364.46, end: 365.62, multiSyllable: true }
  ],
  "j66": [
    { word: "Ka", start: 365.82, end: 366.34, multiSyllable: false },
    { word: "asogi", start: 366.34, end: 367.63, multiSyllable: true },
    { word: "ko.", start: 367.63, end: 368.15, multiSyllable: false }
  ],
  "j67": [
    { word: "Fu", start: 368.35, end: 368.7, multiSyllable: false },
    { word: "mon", start: 368.7, end: 369.22, multiSyllable: false },
    { word: "sanbo", start: 369.22, end: 370.1, multiSyllable: true },
    { word: "myo.", start: 370.1, end: 370.62, multiSyllable: false }
  ],
  "j68": [
    { word: "Sho", start: 370.83, end: 371.36, multiSyllable: false },
    { word: "u", start: 371.36, end: 371.54, multiSyllable: false },
    { word: "shu", start: 371.54, end: 372.07, multiSyllable: false },
    { word: "ku-doku.", start: 372.07, end: 373.14, multiSyllable: true }
  ],
  "j69": [
    { word: "Nyuwa", start: 373.34, end: 373.98, multiSyllable: true },
    { word: "shichi-jiki", start: 373.98, end: 375.25, multiSyllable: true },
    { word: "sha.", start: 375.25, end: 375.63, multiSyllable: false }
  ],
  "j70": [
    { word: "Sokkai", start: 375.83, end: 376.95, multiSyllable: true },
    { word: "ken", start: 376.95, end: 377.52, multiSyllable: false },
    { word: "gashin.", start: 377.52, end: 378.64, multiSyllable: true }
  ],
  "j71": [
    { word: "Zai", start: 378.84, end: 379.37, multiSyllable: false },
    { word: "shi", start: 379.37, end: 379.9, multiSyllable: false },
    { word: "ni", start: 379.9, end: 380.26, multiSyllable: false },
    { word: "seppo.", start: 380.26, end: 381.14, multiSyllable: true }
  ],
  "j72": [
    { word: "Waku-ji", start: 381.34, end: 382.84, multiSyllable: true },
    { word: "i", start: 382.84, end: 383.1, multiSyllable: false },
    { word: "shi", start: 383.1, end: 383.85, multiSyllable: false },
    { word: "shu.", start: 383.85, end: 384.6, multiSyllable: false }
  ],
  "j73": [
    { word: "Setsu", start: 384.8, end: 385.49, multiSyllable: true },
    { word: "butsu-ju", start: 385.49, end: 386.47, multiSyllable: true },
    { word: "muryo.", start: 386.47, end: 387.16, multiSyllable: true }
  ],
  "j74": [
    { word: "Ku", start: 387.36, end: 387.69, multiSyllable: false },
    { word: "nai", start: 387.69, end: 388.19, multiSyllable: false },
    { word: "ken", start: 388.19, end: 388.68, multiSyllable: false },
    { word: "bussha.", start: 388.68, end: 389.67, multiSyllable: true }
  ],
  "j75": [
    { word: "I", start: 389.87, end: 390, multiSyllable: false },
    { word: "setsu", start: 390, end: 390.68, multiSyllable: true },
    { word: "butsu", start: 390.68, end: 391.35, multiSyllable: true },
    { word: "nan", start: 391.35, end: 391.76, multiSyllable: false },
    { word: "chi.", start: 391.76, end: 392.16, multiSyllable: false }
  ],
  "j76": [
    { word: "Ga", start: 392.36, end: 392.68, multiSyllable: false },
    { word: "chi-riki", start: 392.68, end: 393.82, multiSyllable: true },
    { word: "nyo", start: 393.82, end: 394.31, multiSyllable: false },
    { word: "ze.", start: 394.31, end: 394.63, multiSyllable: false }
  ],
  "j77": [
    { word: "Eko", start: 394.83, end: 395.47, multiSyllable: true },
    { word: "sho", start: 395.47, end: 396.1, multiSyllable: false },
    { word: "muryo.", start: 396.1, end: 397.16, multiSyllable: true }
  ],
  "j78": [
    { word: "Jumyo", start: 397.36, end: 398.19, multiSyllable: true },
    { word: "mushu", start: 398.19, end: 399.02, multiSyllable: true },
    { word: "ko.", start: 399.02, end: 399.35, multiSyllable: false }
  ],
  "j79": [
    { word: "Ku", start: 399.56, end: 399.86, multiSyllable: false },
    { word: "shugo", start: 399.86, end: 400.6, multiSyllable: true },
    { word: "sho", start: 400.6, end: 401.05, multiSyllable: false },
    { word: "toku.", start: 401.05, end: 401.64, multiSyllable: true }
  ],
  "j80": [
    { word: "Nyoto", start: 401.84, end: 402.81, multiSyllable: true },
    { word: "u", start: 402.81, end: 403, multiSyllable: false },
    { word: "chi", start: 403, end: 403.58, multiSyllable: false },
    { word: "sha.", start: 403.58, end: 404.16, multiSyllable: false }
  ],
  "j81": [
    { word: "Mot", start: 404.36, end: 404.89, multiSyllable: false },
    { word: "to", start: 404.89, end: 405.24, multiSyllable: false },
    { word: "shi", start: 405.24, end: 405.78, multiSyllable: false },
    { word: "sho", start: 405.78, end: 406.31, multiSyllable: false },
    { word: "gi.", start: 406.31, end: 406.66, multiSyllable: false }
  ],
  "j82": [
    { word: "To", start: 406.86, end: 407.21, multiSyllable: false },
    { word: "dan", start: 407.21, end: 407.73, multiSyllable: false },
    { word: "ryo", start: 407.73, end: 408.25, multiSyllable: false },
    { word: "yo", start: 408.25, end: 408.6, multiSyllable: false },
    { word: "jin.", start: 408.6, end: 409.12, multiSyllable: false }
  ],
  "j83": [
    { word: "Butsu-go", start: 409.32, end: 410.49, multiSyllable: true },
    { word: "jip", start: 410.49, end: 410.98, multiSyllable: false },
    { word: "puko.", start: 410.98, end: 411.65, multiSyllable: true }
  ],
  "j84": [
    { word: "Nyo", start: 411.85, end: 412.42, multiSyllable: false },
    { word: "i", start: 412.42, end: 412.61, multiSyllable: false },
    { word: "zen", start: 412.61, end: 413.19, multiSyllable: false },
    { word: "hoben.", start: 413.19, end: 414.14, multiSyllable: true }
  ],
  "j85": [
    { word: "I", start: 414.34, end: 414.59, multiSyllable: false },
    { word: "ji", start: 414.59, end: 415.1, multiSyllable: false },
    { word: "o", start: 415.1, end: 415.35, multiSyllable: false },
    { word: "shi", start: 415.35, end: 416.11, multiSyllable: false },
    { word: "ko.", start: 416.11, end: 416.62, multiSyllable: false }
  ],
  "j86": [
    { word: "Jitsu", start: 416.82, end: 417.56, multiSyllable: true },
    { word: "zai", start: 417.56, end: 418, multiSyllable: false },
    { word: "ni", start: 418, end: 418.3, multiSyllable: false },
    { word: "gon", start: 418.3, end: 418.74, multiSyllable: false },
    { word: "shi.", start: 418.74, end: 419.18, multiSyllable: false }
  ],
  "j87": [
    { word: "Mu", start: 419.38, end: 419.8, multiSyllable: false },
    { word: "no", start: 419.8, end: 420.21, multiSyllable: false },
    { word: "sek", start: 420.21, end: 420.84, multiSyllable: false },
    { word: "komo.", start: 420.84, end: 421.67, multiSyllable: true }
  ],
  "j88": [
    { word: "Ga", start: 421.88, end: 422.29, multiSyllable: false },
    { word: "yaku", start: 422.29, end: 423.11, multiSyllable: true },
    { word: "i", start: 423.11, end: 423.32, multiSyllable: false },
    { word: "se", start: 423.32, end: 423.73, multiSyllable: false },
    { word: "bu.", start: 423.73, end: 424.14, multiSyllable: false }
  ],
  "j89": [
    { word: "Ku", start: 424.34, end: 424.69, multiSyllable: false },
    { word: "sho", start: 424.69, end: 425.22, multiSyllable: false },
    { word: "kugen", start: 425.22, end: 426.11, multiSyllable: true },
    { word: "sha.", start: 426.11, end: 426.64, multiSyllable: false }
  ],
  "j90": [
    { word: "I", start: 426.84, end: 427.04, multiSyllable: false },
    { word: "bonbu", start: 427.04, end: 428.03, multiSyllable: true },
    { word: "tendo.", start: 428.03, end: 429.02, multiSyllable: true }
  ],
  "j91": [
    { word: "Jitsu", start: 429.22, end: 429.76, multiSyllable: true },
    { word: "zai", start: 429.76, end: 430.08, multiSyllable: false },
    { word: "ni", start: 430.08, end: 430.29, multiSyllable: false },
    { word: "gon", start: 430.29, end: 430.61, multiSyllable: false },
    { word: "metsu.", start: 430.61, end: 431.15, multiSyllable: true }
  ],
  "j92": [
    { word: "I", start: 431.35, end: 431.58, multiSyllable: false },
    { word: "joken", start: 431.58, end: 432.7, multiSyllable: true },
    { word: "ga", start: 432.7, end: 433.15, multiSyllable: false },
    { word: "ko.", start: 433.15, end: 433.6, multiSyllable: false }
  ],
  "j93": [
    { word: "Ni", start: 433.8, end: 434.08, multiSyllable: false },
    { word: "sho", start: 434.08, end: 434.5, multiSyllable: false },
    { word: "kyoshi", start: 434.5, end: 435.35, multiSyllable: true },
    { word: "shin.", start: 435.35, end: 435.91, multiSyllable: false }
  ],
  "j94": [
    { word: "Ho-itsu", start: 436.11, end: 436.88, multiSyllable: true },
    { word: "jaku", start: 436.88, end: 437.4, multiSyllable: true },
    { word: "go-yoku.", start: 437.4, end: 438.17, multiSyllable: true }
  ],
  "j95": [
    { word: "Da", start: 438.37, end: 438.79, multiSyllable: false },
    { word: "o", start: 438.79, end: 439, multiSyllable: false },
    { word: "aku-do", start: 439, end: 440.04, multiSyllable: true },
    { word: "chu.", start: 440.04, end: 440.67, multiSyllable: false }
  ],
  "j96": [
    { word: "Ga", start: 440.87, end: 441.26, multiSyllable: false },
    { word: "jo", start: 441.26, end: 441.65, multiSyllable: false },
    { word: "chi", start: 441.65, end: 442.23, multiSyllable: false },
    { word: "shujo.", start: 442.23, end: 443.2, multiSyllable: true }
  ],
  "j97": [
    { word: "Gyo", start: 443.4, end: 443.97, multiSyllable: false },
    { word: "do", start: 443.97, end: 444.34, multiSyllable: false },
    { word: "fu", start: 444.34, end: 444.72, multiSyllable: false },
    { word: "gyo", start: 444.72, end: 445.28, multiSyllable: false },
    { word: "do.", start: 445.28, end: 445.66, multiSyllable: false }
  ],
  "j98": [
    { word: "Zui", start: 445.86, end: 446.47, multiSyllable: false },
    { word: "o", start: 446.47, end: 446.68, multiSyllable: false },
    { word: "sho", start: 446.68, end: 447.29, multiSyllable: false },
    { word: "ka", start: 447.29, end: 447.7, multiSyllable: false },
    { word: "do.", start: 447.7, end: 448.11, multiSyllable: false }
  ],
  "j99": [
    { word: "I", start: 448.31, end: 448.52, multiSyllable: false },
    { word: "ses", start: 448.52, end: 449.16, multiSyllable: false },
    { word: "shuju", start: 449.16, end: 450.22, multiSyllable: true },
    { word: "ho.", start: 450.22, end: 450.64, multiSyllable: false }
  ],
  "j100": [
    { word: "Mai", start: 450.84, end: 451.46, multiSyllable: false },
    { word: "ji", start: 451.46, end: 451.87, multiSyllable: false },
    { word: "sa", start: 451.87, end: 452.29, multiSyllable: false },
    { word: "ze", start: 452.29, end: 452.7, multiSyllable: false },
    { word: "nen.", start: 452.7, end: 453.32, multiSyllable: false }
  ],
  "j101": [
    { word: "I", start: 453.52, end: 453.72, multiSyllable: false },
    { word: "ga", start: 453.72, end: 454.13, multiSyllable: false },
    { word: "ryo", start: 454.13, end: 454.74, multiSyllable: false },
    { word: "shujo.", start: 454.74, end: 455.76, multiSyllable: true }
  ],
  "j102": [
    { word: "Toku", start: 455.96, end: 456.64, multiSyllable: true },
    { word: "nyu", start: 456.64, end: 457.14, multiSyllable: false },
    { word: "mu-jo", start: 457.14, end: 457.82, multiSyllable: true },
    { word: "do.", start: 457.82, end: 458.16, multiSyllable: false }
  ],
  "j103": [
    { word: "Soku", start: 458.36, end: 458.9, multiSyllable: true },
    { word: "joju", start: 458.9, end: 459.43, multiSyllable: true },
    { word: "busshin.", start: 459.43, end: 460.37, multiSyllable: true }
  ]
};
