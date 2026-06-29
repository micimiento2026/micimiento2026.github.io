import { useState, useEffect } from "react";

// ============================================================
// MiCimiento — App educativa de inversión bilingüe ES/EN
// Principio rector: la app educa y muestra datos. El usuario decide.
// Nunca recomienda activos individuales a una persona específica.
// ============================================================

const COLORS = {
  bg: "#0A0F1A",
  surface: "#111827",
  surface2: "#1A2333",
  surface3: "#1F2D42",
  line: "#243044",
  text: "#F0EDE6",
  textDim: "#9CA3AF",
  textFaint: "#6B7280",
  mint: "#34D399",
  mintDark: "#059669",
  amber: "#FBBF24",
  blue: "#60A5FA",
  red: "#F87171",
  purple: "#A78BFA",
};

// ── i18n ────────────────────────────────────────────────────
const STR = {
  es: {
    appName: "MiCimiento",
    tagline: "Tu base para entender el mercado",
    disclaimer:
      "Información educativa únicamente. No somos asesores financieros ni recomendamos activos específicos.",
    nav: {
      home: "Inicio",
      quiz: "Mi Perfil",
      explorer: "Explorador",
      glossary: "Glosario",
      checklist: "Checklist",
      riskcenter: "Riesgo",
      calculator: "Calculadora",
      simulator: "Simulador",
    },
    home: {
      hero: "Entiende el mercado antes de invertir",
      heroSub:
        "MiCimiento te da las herramientas educativas para tomar tus propias decisiones — sin que nadie te diga qué comprar.",
      cta: "Descubrir mi perfil de riesgo",
      principle: "Nuestro principio",
      principleText:
        "La app educa y muestra datos. Tú decides. Nunca gestionamos tu dinero ni ejecutamos operaciones.",
      modules: "Los 7 módulos",
    },
    quiz: {
      title: "¿Cuál es tu perfil de riesgo?",
      subtitle: "7 preguntas para entender cómo piensas sobre el dinero",
      next: "Siguiente",
      prev: "Anterior",
      result: "Tu perfil",
      restart: "Volver a empezar",
    },
    explorer: {
      title: "Explorador de acciones y ETFs",
      subtitle: "Busca un ticker para ver sus métricas explicadas",
      search: "Buscar ticker (ej: VOO, NVDA, AAPL)...",
      noResult: "Ticker no encontrado en nuestra base de datos de ejemplo.",
      metricLabel: "¿Qué significa esta métrica?",
    },
    glossary: {
      title: "Glosario financiero",
      subtitle: "Cada término explicado en lenguaje simple",
      search: "Buscar término...",
    },
    checklist: {
      title: "Checklist pre-inversión",
      subtitle:
        "Antes de agregar un activo a tu cartera, responde estas preguntas",
      reset: "Nueva sesión",
      complete: "¡Análisis completo!",
      completeText:
        "Has respondido todas las preguntas clave. Guarda tus notas antes de tomar una decisión.",
    },
    riskcenter: {
      title: "Centro de gestión de riesgo",
      subtitle: "Qué opciones existen ante distintos escenarios del mercado",
    },
    calculator: {
      title: "Calculadora de interés compuesto",
      subtitle: "Proyecciones históricas — no garantías de retorno futuro",
      initial: "Capital inicial ($)",
      monthly: "Aporte mensual ($)",
      years: "Años",
      calculate: "Calcular",
      disclaimer:
        "Los rangos se basan en retornos históricos del S&P 500. El pasado no garantiza el futuro.",
      rangeTitle: "Rango proyectado a",
      conservative: "Conservador (7% anual)",
      moderate: "Moderado (10% anual)",
      optimistic: "Optimista (13% anual)",
    },
    simulator: {
      title: "Simulador de cartera",
      subtitle: "Distribuye $10,000 virtuales entre activos y ve cómo quedaría tu cartera — sin dinero real",
      capital: "Capital virtual",
      allocated: "Asignado",
      remaining: "Disponible",
      reset: "Reiniciar",
      projection: "Proyección a 10 años",
      diversification: "Diversificación",
      divLow: "Concentrada — considera diversificar más",
      divMed: "Moderada — buen balance",
      divHigh: "Bien diversificada",
      disclaimer: "Simulación educativa. Los retornos se basan en medias históricas. No garantizan resultados futuros.",
      emptyMsg: "Asigna capital a los activos para ver tu proyección.",
      allocation: "Distribución",
      projected: "Proyectado",
      assets: "Activos disponibles",
      add: "Agregar",
      remove: "Quitar",
    },
  },
  en: {
    appName: "MiCimiento",
    tagline: "Your foundation for understanding markets",
    disclaimer:
      "Educational information only. We are not financial advisors and do not recommend specific assets.",
    nav: {
      home: "Home",
      quiz: "My Profile",
      explorer: "Explorer",
      glossary: "Glossary",
      checklist: "Checklist",
      riskcenter: "Risk",
      calculator: "Calculator",
      simulator: "Simulator",
    },
    home: {
      hero: "Understand markets before you invest",
      heroSub:
        "MiCimiento gives you the educational tools to make your own decisions — without anyone telling you what to buy.",
      cta: "Discover my risk profile",
      principle: "Our principle",
      principleText:
        "The app educates and shows data. You decide. We never manage your money or execute trades.",
      modules: "The 7 modules",
    },
    quiz: {
      title: "What's your risk profile?",
      subtitle: "7 questions to understand how you think about money",
      next: "Next",
      prev: "Back",
      result: "Your profile",
      restart: "Start over",
    },
    explorer: {
      title: "Stocks & ETFs Explorer",
      subtitle: "Search a ticker to see its metrics explained",
      search: "Search ticker (e.g. VOO, NVDA, AAPL)...",
      noResult: "Ticker not found in our sample database.",
      metricLabel: "What does this metric mean?",
    },
    glossary: {
      title: "Financial Glossary",
      subtitle: "Every term explained in plain language",
      search: "Search term...",
    },
    checklist: {
      title: "Pre-Investment Checklist",
      subtitle: "Before adding an asset to your portfolio, answer these questions",
      reset: "New session",
      complete: "Analysis complete!",
      completeText:
        "You've answered all key questions. Save your notes before making a decision.",
    },
    riskcenter: {
      title: "Risk Management Center",
      subtitle: "What options exist for different market scenarios",
    },
    calculator: {
      title: "Compound Interest Calculator",
      subtitle: "Historical projections — not guarantees of future returns",
      initial: "Initial capital ($)",
      monthly: "Monthly contribution ($)",
      years: "Years",
      calculate: "Calculate",
      disclaimer:
        "Ranges are based on historical S&P 500 returns. Past performance does not guarantee future results.",
      rangeTitle: "Projected range at",
      conservative: "Conservative (7% annual)",
      moderate: "Moderate (10% annual)",
      optimistic: "Optimistic (13% annual)",
    },
    simulator: {
      title: "Portfolio Simulator",
      subtitle: "Distribute $10,000 virtual dollars across assets and see how your portfolio would look — no real money",
      capital: "Virtual capital",
      allocated: "Allocated",
      remaining: "Available",
      reset: "Reset",
      projection: "10-year projection",
      diversification: "Diversification",
      divLow: "Concentrated — consider diversifying more",
      divMed: "Moderate — good balance",
      divHigh: "Well diversified",
      disclaimer: "Educational simulation. Returns are based on historical averages. They do not guarantee future results.",
      emptyMsg: "Allocate capital to assets to see your projection.",
      allocation: "Allocation",
      projected: "Projected",
      assets: "Available assets",
      add: "Add",
      remove: "Remove",
    },
  },
};

// ── DATA ────────────────────────────────────────────────────
const QUIZ_QUESTIONS = {
  es: [
    {
      q: "Si tu cartera cae un 20% en un mes, ¿qué harías?",
      opts: [
        { t: "Vendo todo para evitar más pérdidas", v: 1 },
        { t: "Vendo una parte para reducir el riesgo", v: 2 },
        { t: "No hago nada y espero", v: 3 },
        { t: "Compro más aprovechando el precio bajo", v: 4 },
      ],
    },
    {
      q: "¿Cuándo necesitas este dinero?",
      opts: [
        { t: "En menos de 1 año", v: 1 },
        { t: "Entre 1 y 3 años", v: 2 },
        { t: "Entre 3 y 10 años", v: 3 },
        { t: "Más de 10 años", v: 4 },
      ],
    },
    {
      q: "¿Cómo describes tu conocimiento sobre inversiones?",
      opts: [
        { t: "Ninguno, soy principiante total", v: 1 },
        { t: "Básico, he leído algo", v: 2 },
        { t: "Intermedio, entiendo métricas básicas", v: 3 },
        { t: "Avanzado, analizo empresas con regularidad", v: 4 },
      ],
    },
    {
      q: "¿Qué porcentaje de tus ahorros totales invertirías?",
      opts: [
        { t: "Menos del 10%", v: 1 },
        { t: "Entre 10% y 25%", v: 2 },
        { t: "Entre 25% y 50%", v: 3 },
        { t: "Más del 50%", v: 4 },
      ],
    },
    {
      q: "¿Tienes un fondo de emergencia (3-6 meses de gastos)?",
      opts: [
        { t: "No", v: 1 },
        { t: "Parcialmente", v: 2 },
        { t: "Sí, tengo 3 meses", v: 3 },
        { t: "Sí, tengo 6 meses o más", v: 4 },
      ],
    },
    {
      q: "¿Cómo te sientes ante la incertidumbre financiera?",
      opts: [
        { t: "Me genera mucha ansiedad", v: 1 },
        { t: "Me incomoda pero lo manejo", v: 2 },
        { t: "Lo acepto como parte del proceso", v: 3 },
        { t: "Lo veo como oportunidad", v: 4 },
      ],
    },
    {
      q: "¿Cuál es tu objetivo principal al invertir?",
      opts: [
        { t: "Proteger mi dinero de la inflación", v: 1 },
        { t: "Crecimiento moderado con estabilidad", v: 2 },
        { t: "Crecimiento a largo plazo", v: 3 },
        { t: "Máximo crecimiento, acepto alta volatilidad", v: 4 },
      ],
    },
  ],
  en: [
    {
      q: "If your portfolio drops 20% in a month, what would you do?",
      opts: [
        { t: "Sell everything to avoid further losses", v: 1 },
        { t: "Sell part to reduce risk", v: 2 },
        { t: "Do nothing and wait", v: 3 },
        { t: "Buy more at the lower price", v: 4 },
      ],
    },
    {
      q: "When do you need this money?",
      opts: [
        { t: "In less than 1 year", v: 1 },
        { t: "Between 1 and 3 years", v: 2 },
        { t: "Between 3 and 10 years", v: 3 },
        { t: "More than 10 years", v: 4 },
      ],
    },
    {
      q: "How would you describe your investing knowledge?",
      opts: [
        { t: "None, I'm a complete beginner", v: 1 },
        { t: "Basic, I've read a bit", v: 2 },
        { t: "Intermediate, I understand basic metrics", v: 3 },
        { t: "Advanced, I regularly analyze companies", v: 4 },
      ],
    },
    {
      q: "What percentage of your total savings would you invest?",
      opts: [
        { t: "Less than 10%", v: 1 },
        { t: "Between 10% and 25%", v: 2 },
        { t: "Between 25% and 50%", v: 3 },
        { t: "More than 50%", v: 4 },
      ],
    },
    {
      q: "Do you have an emergency fund (3-6 months of expenses)?",
      opts: [
        { t: "No", v: 1 },
        { t: "Partially", v: 2 },
        { t: "Yes, I have 3 months", v: 3 },
        { t: "Yes, I have 6+ months", v: 4 },
      ],
    },
    {
      q: "How do you feel about financial uncertainty?",
      opts: [
        { t: "It causes me a lot of anxiety", v: 1 },
        { t: "It makes me uncomfortable but I manage", v: 2 },
        { t: "I accept it as part of the process", v: 3 },
        { t: "I see it as opportunity", v: 4 },
      ],
    },
    {
      q: "What is your main goal when investing?",
      opts: [
        { t: "Protect my money from inflation", v: 1 },
        { t: "Moderate growth with stability", v: 2 },
        { t: "Long-term growth", v: 3 },
        { t: "Maximum growth, I accept high volatility", v: 4 },
      ],
    },
  ],
};

const PROFILES = {
  es: {
    conservative: {
      name: "Conservador",
      color: COLORS.blue,
      desc: "Priorizas la estabilidad y la preservación del capital. Prefieres menor rentabilidad a cambio de menor riesgo.",
      suggestion:
        "Instrumentos como ETFs de dividendos, bonos o fondos indexados de baja volatilidad suelen alinearse con este perfil.",
    },
    moderate: {
      name: "Moderado",
      color: COLORS.mint,
      desc: "Buscas un equilibrio entre crecimiento y estabilidad. Aceptas cierta volatilidad si va acompañada de mayor potencial.",
      suggestion:
        "Carteras mixtas entre ETFs amplios (S&P 500) y algunos activos de crecimiento suelen corresponder a este perfil.",
    },
    aggressive: {
      name: "Agresivo",
      color: COLORS.amber,
      desc: "Priorizas el crecimiento a largo plazo y aceptas volatilidad significativa en el camino.",
      suggestion:
        "Acciones de crecimiento, ETFs tecnológicos y mercados emergentes son instrumentos que típicamente atraen a este perfil.",
    },
  },
  en: {
    conservative: {
      name: "Conservative",
      color: COLORS.blue,
      desc: "You prioritize stability and capital preservation. You prefer lower returns in exchange for lower risk.",
      suggestion:
        "Instruments like dividend ETFs, bonds, or low-volatility index funds tend to align with this profile.",
    },
    moderate: {
      name: "Moderate",
      color: COLORS.mint,
      desc: "You seek a balance between growth and stability. You accept some volatility if it comes with higher potential.",
      suggestion:
        "Mixed portfolios between broad ETFs (S&P 500) and some growth assets typically correspond to this profile.",
    },
    aggressive: {
      name: "Aggressive",
      color: COLORS.amber,
      desc: "You prioritize long-term growth and accept significant volatility along the way.",
      suggestion:
        "Growth stocks, tech ETFs, and emerging markets are instruments that typically attract this profile.",
    },
  },
};

const TICKERS = {
  VOO: {
    name: "Vanguard S&P 500 ETF",
    type: "ETF",
    price: "$688",
    metrics: {
      es: [
        { k: "Expense Ratio (TER)", v: "0.03%", def: "Lo que cobra el fondo por gestionarse. 0.03% significa que por cada $10,000 invertidos, pagas $3 al año. Extremadamente bajo." },
        { k: "Índice que replica", v: "S&P 500", def: "El ETF compra las 500 empresas más grandes de EE.UU. en la misma proporción. Si el S&P 500 sube, VOO sube." },
        { k: "AUM (activos totales)", v: "$1.62T", def: "Cuánto dinero total tiene invertido el fondo. Mayor AUM = mayor liquidez = más fácil comprar y vender sin mover el precio." },
        { k: "P/E Ratio", v: "22x", def: "Precio sobre ganancias. El mercado paga $22 por cada $1 de ganancia de las empresas en el índice. Históricamente normal para el S&P 500." },
        { k: "Dividend Yield", v: "1.09%", def: "Porcentaje del precio que recibes en dividendos al año. En VOO es bajo porque es un fondo de crecimiento, no de ingresos." },
        { k: "Método de réplica", v: "Física completa", def: "El fondo realmente compra todas las acciones del índice. Más transparente y menos riesgo de contraparte que la réplica sintética." },
      ],
      en: [
        { k: "Expense Ratio (TER)", v: "0.03%", def: "What the fund charges to manage itself. 0.03% means for every $10,000 invested, you pay $3 per year. Extremely low." },
        { k: "Index tracked", v: "S&P 500", def: "The ETF buys the 500 largest U.S. companies in the same proportion. If the S&P 500 goes up, VOO goes up." },
        { k: "AUM (total assets)", v: "$1.62T", def: "How much total money is invested in the fund. Higher AUM = more liquidity = easier to buy and sell without moving the price." },
        { k: "P/E Ratio", v: "22x", def: "Price to earnings. The market pays $22 for every $1 of earnings from companies in the index. Historically normal for the S&P 500." },
        { k: "Dividend Yield", v: "1.09%", def: "Percentage of price you receive in dividends per year. In VOO it's low because it's a growth fund, not an income fund." },
        { k: "Replication method", v: "Full physical", def: "The fund actually buys all the stocks in the index. More transparent and less counterparty risk than synthetic replication." },
      ],
    },
  },
  NVDA: {
    name: "NVIDIA Corporation",
    type: "Stock",
    price: "$210",
    metrics: {
      es: [
        { k: "P/E Ratio (TTM)", v: "31.7x", def: "El mercado paga $31.7 por cada $1 de ganancia. Elevado pero más moderado que en años anteriores cuando superaba 100x." },
        { k: "PEG Ratio", v: "0.9x", def: "P/E ajustado por crecimiento esperado. Menor a 1 se considera barato relativo a su crecimiento. NVDA está cerca de ese umbral." },
        { k: "ROE", v: "73%", def: "Retorno sobre el capital. Por cada $100 de capital propio, NVDA genera $73 de ganancia. Número excepcional, refleja dominio en su industria." },
        { k: "Margen neto", v: "56%", def: "De cada $100 que factura, NVDA se queda con $56 de ganancia neta. Margen de clase mundial en semiconductores." },
        { k: "Deuda/Capital", v: "0.42x", def: "Por cada $1 de capital propio, tiene $0.42 de deuda. Nivel manageable para una empresa de este tamaño." },
        { k: "Segmento principal", v: "Data Center AI", def: "La mayor parte de ingresos viene de GPUs para centros de datos de IA. MSFT, GOOG, META y AMZN son sus mayores clientes." },
      ],
      en: [
        { k: "P/E Ratio (TTM)", v: "31.7x", def: "The market pays $31.7 for every $1 of earnings. Elevated but more moderate than previous years when it exceeded 100x." },
        { k: "PEG Ratio", v: "0.9x", def: "P/E adjusted for expected growth. Below 1 is considered cheap relative to growth. NVDA is near that threshold." },
        { k: "ROE", v: "73%", def: "Return on equity. For every $100 of equity, NVDA generates $73 in profit. Exceptional number, reflects dominance in its industry." },
        { k: "Net Margin", v: "56%", def: "Of every $100 billed, NVDA keeps $56 in net profit. World-class margin in semiconductors." },
        { k: "Debt/Equity", v: "0.42x", def: "For every $1 of equity, it has $0.42 of debt. Manageable level for a company of this size." },
        { k: "Main segment", v: "Data Center AI", def: "The majority of revenue comes from GPUs for AI data centers. MSFT, GOOG, META and AMZN are its largest customers." },
      ],
    },
  },
  AAPL: {
    name: "Apple Inc.",
    type: "Stock",
    price: "$298",
    metrics: {
      es: [
        { k: "P/E Ratio (TTM)", v: "31x", def: "El mercado paga $31 por cada $1 de ganancia. Elevado para una empresa de su madurez, refleja la confianza en el ecosistema Apple." },
        { k: "ROE", v: "148%", def: "Extremadamente alto porque Apple recompra muchas acciones, reduciendo el capital contable. No siempre interpretable en términos convencionales." },
        { k: "Margen neto", v: "26%", def: "De cada $100 facturados, $26 son ganancia neta. Muy sólido para una empresa de hardware/servicios de su escala." },
        { k: "Dividend Yield", v: "0.5%", def: "Paga dividendos pero son simbólicos. Apple prefiere recomprar acciones como forma de devolver valor al accionista." },
        { k: "Ingresos por servicios", v: "~22% del total", def: "iCloud, App Store, Apple Music, Apple TV+. Este segmento tiene márgenes mucho más altos que el hardware." },
        { k: "Recompras de acciones", v: "$90B+ anuales", def: "Apple recompra sus propias acciones agresivamente, reduciendo las acciones en circulación y aumentando el valor de cada acción restante." },
      ],
      en: [
        { k: "P/E Ratio (TTM)", v: "31x", def: "The market pays $31 for every $1 of earnings. Elevated for a company of its maturity, reflects confidence in the Apple ecosystem." },
        { k: "ROE", v: "148%", def: "Extremely high because Apple buys back many shares, reducing book equity. Not always interpretable in conventional terms." },
        { k: "Net Margin", v: "26%", def: "Of every $100 billed, $26 is net profit. Very solid for a hardware/services company of its scale." },
        { k: "Dividend Yield", v: "0.5%", def: "Pays dividends but they're symbolic. Apple prefers to buy back shares as a way to return value to shareholders." },
        { k: "Services revenue", v: "~22% of total", def: "iCloud, App Store, Apple Music, Apple TV+. This segment has much higher margins than hardware." },
        { k: "Share buybacks", v: "$90B+ annually", def: "Apple aggressively buys back its own shares, reducing shares outstanding and increasing the value of each remaining share." },
      ],
    },
  },
  SCHD: {
    name: "Schwab US Dividend Equity ETF",
    type: "ETF",
    price: "$31.86",
    metrics: {
      es: [
        { k: "Expense Ratio (TER)", v: "0.06%", def: "Muy bajo. Por cada $10,000, pagas $6 al año en comisiones de gestión." },
        { k: "Dividend Yield", v: "3.8%", def: "Paga $3.80 en dividendos por cada $100 invertidos al año. ETF diseñado específicamente para ingresos por dividendos." },
        { k: "Índice que replica", v: "Dow Jones US Dividend 100", def: "Las 100 empresas de EE.UU. con historial sólido de pago y crecimiento de dividendos." },
        { k: "Número de holdings", v: "~100", def: "Concentrado en 100 empresas. Más concentrado que VOO (500) pero más diversificado que una cartera individual." },
        { k: "Sectores principales", v: "Financiero, Industrial, Salud", def: "Menor exposición tecnológica que VOO. Complementa bien a VOO o a carteras heavy en tech." },
        { k: "Frecuencia de dividendos", v: "Trimestral", def: "Paga dividendos 4 veces al año: marzo, junio, septiembre, diciembre." },
      ],
      en: [
        { k: "Expense Ratio (TER)", v: "0.06%", def: "Very low. For every $10,000, you pay $6 per year in management fees." },
        { k: "Dividend Yield", v: "3.8%", def: "Pays $3.80 in dividends per $100 invested per year. ETF specifically designed for dividend income." },
        { k: "Index tracked", v: "Dow Jones US Dividend 100", def: "The 100 U.S. companies with a solid history of dividend payment and growth." },
        { k: "Number of holdings", v: "~100", def: "Concentrated in 100 companies. More concentrated than VOO (500) but more diversified than an individual portfolio." },
        { k: "Main sectors", v: "Financial, Industrial, Health", def: "Less tech exposure than VOO. Complements VOO or tech-heavy portfolios well." },
        { k: "Dividend frequency", v: "Quarterly", def: "Pays dividends 4 times a year: March, June, September, December." },
      ],
    },
  },
  QQQ: {
    name: "Invesco QQQ Trust",
    type: "ETF",
    price: "$740",
    metrics: {
      es: [
        { k: "Expense Ratio (TER)", v: "0.20%", def: "Más caro que VOO pero aún bajo en términos absolutos. Por $10,000 pagas $20 al año." },
        { k: "Índice que replica", v: "Nasdaq-100", def: "Las 100 mayores empresas no financieras del Nasdaq. Alta concentración en tecnología." },
        { k: "Top 5 holdings", v: "MSFT, NVDA, AAPL, AMZN, META", def: "Solo 5 empresas representan ~40% del ETF. Alta concentración = más volatilidad pero también más potencial." },
        { k: "Exposición tecnológica", v: "~58%", def: "Más de la mitad del fondo está en sector tecnológico. Muy diferente a VOO que tiene ~39% en tech." },
        { k: "Retorno 10 años", v: "~18% anual", def: "Ha superado consistentemente al S&P 500 en la última década. No garantiza que lo seguirá haciendo." },
        { k: "Número de holdings", v: "100", def: "Solo 100 empresas vs. 500 de VOO. Más concentrado = más riesgo pero también más retorno potencial." },
      ],
      en: [
        { k: "Expense Ratio (TER)", v: "0.20%", def: "More expensive than VOO but still low in absolute terms. For $10,000 you pay $20 per year." },
        { k: "Index tracked", v: "Nasdaq-100", def: "The 100 largest non-financial companies on the Nasdaq. High concentration in technology." },
        { k: "Top 5 holdings", v: "MSFT, NVDA, AAPL, AMZN, META", def: "Just 5 companies represent ~40% of the ETF. High concentration = more volatility but also more potential." },
        { k: "Tech exposure", v: "~58%", def: "More than half the fund is in the tech sector. Very different from VOO which has ~39% in tech." },
        { k: "10-year return", v: "~18% annual", def: "Has consistently outperformed the S&P 500 over the last decade. Does not guarantee it will continue." },
        { k: "Number of holdings", v: "100", def: "Only 100 companies vs. 500 for VOO. More concentrated = more risk but also more potential return." },
      ],
    },
  },
  SPY: {
    name: "SPDR S&P 500 ETF Trust",
    type: "ETF",
    price: "$612",
    metrics: {
      es: [
        { k: "Expense Ratio (TER)", v: "0.0945%", def: "Ligeramente más caro que VOO (0.03%), aunque ambos replican el mismo índice. La diferencia en retornos es mínima a largo plazo." },
        { k: "Índice que replica", v: "S&P 500", def: "Mismo índice que VOO. Las 500 empresas más grandes de EE.UU. por capitalización de mercado." },
        { k: "AUM (activos totales)", v: "$620B", def: "El ETF más grande y líquido del mundo. Su tamaño garantiza spreads muy ajustados al comprar o vender." },
        { k: "Liquidez diaria", v: "~$25B/día", def: "El activo más negociado del mundo. Ideal para traders activos; para inversión pasiva, VOO es más barato." },
        { k: "Dividend Yield", v: "1.2%", def: "Similar a VOO. Los dividendos se pagan trimestralmente." },
        { k: "Diferencia vs VOO", v: "Mismo índice", def: "SPY tiene mayor liquidez y volumen (mejor para trading). VOO tiene menor costo (mejor para largo plazo). El índice subyacente es idéntico." },
      ],
      en: [
        { k: "Expense Ratio (TER)", v: "0.0945%", def: "Slightly more expensive than VOO (0.03%), though both track the same index. The difference in returns is minimal long-term." },
        { k: "Index tracked", v: "S&P 500", def: "Same index as VOO. The 500 largest U.S. companies by market capitalization." },
        { k: "AUM (total assets)", v: "$620B", def: "The largest and most liquid ETF in the world. Its size guarantees very tight spreads when buying or selling." },
        { k: "Daily liquidity", v: "~$25B/day", def: "The most traded asset in the world. Ideal for active traders; for passive investing, VOO is cheaper." },
        { k: "Dividend Yield", v: "1.2%", def: "Similar to VOO. Dividends are paid quarterly." },
        { k: "Difference vs VOO", v: "Same index", def: "SPY has higher liquidity and volume (better for trading). VOO has lower cost (better for long-term). The underlying index is identical." },
      ],
    },
  },
  MSFT: {
    name: "Microsoft Corporation",
    type: "Stock",
    price: "$510",
    metrics: {
      es: [
        { k: "P/E Ratio (TTM)", v: "38x", def: "El mercado paga $38 por cada $1 de ganancia. Elevado, pero justificado por el crecimiento sostenido de Azure y la apuesta en IA con OpenAI." },
        { k: "Margen neto", v: "36%", def: "De cada $100 facturados, Microsoft retiene $36. Uno de los márgenes más altos en Big Tech, impulsado por la nube y software." },
        { k: "ROE", v: "38%", def: "Retorno sobre el capital propio sólido y sostenible. Diferente al ROE inflado de Apple por recompras." },
        { k: "Ingresos en la nube", v: "~43% del total", def: "Azure es el segundo proveedor de nube del mundo (tras AWS). Es el motor de crecimiento más importante de la empresa." },
        { k: "Dividend Yield", v: "0.7%", def: "Paga dividendos estables y los ha incrementado cada año por más de 20 años. No es un ETF de dividendos, pero la consistencia es notable." },
        { k: "Deuda/Capital", v: "0.3x", def: "Muy baja. Microsoft tiene más efectivo que deuda neta. Posición financiera extremadamente sólida." },
      ],
      en: [
        { k: "P/E Ratio (TTM)", v: "38x", def: "The market pays $38 for every $1 of earnings. Elevated, but justified by sustained growth of Azure and AI bet with OpenAI." },
        { k: "Net Margin", v: "36%", def: "Of every $100 billed, Microsoft keeps $36. One of the highest margins in Big Tech, driven by cloud and software." },
        { k: "ROE", v: "38%", def: "Solid and sustainable return on equity. Different from Apple's inflated ROE due to buybacks." },
        { k: "Cloud revenue", v: "~43% of total", def: "Azure is the world's second cloud provider (after AWS). It's the company's most important growth engine." },
        { k: "Dividend Yield", v: "0.7%", def: "Pays stable dividends and has increased them every year for over 20 years. Not a dividend ETF, but the consistency is notable." },
        { k: "Debt/Equity", v: "0.3x", def: "Very low. Microsoft has more cash than net debt. Extremely solid financial position." },
      ],
    },
  },
  AMZN: {
    name: "Amazon.com Inc.",
    type: "Stock",
    price: "$225",
    metrics: {
      es: [
        { k: "P/E Ratio (TTM)", v: "44x", def: "Parece caro, pero Amazon reinvirtió ganancias durante 20 años. Ahora que AWS madura, los márgenes están subiendo aceleradamente." },
        { k: "Margen neto", v: "9%", def: "Históricamente cercano a 0% porque reinvertía todo. Ahora llega al 9% gracias a AWS (margen ~30%) que subsidia el e-commerce." },
        { k: "AWS (nube)", v: "~17% ingresos, ~67% utilidad operativa", def: "AWS representa menos del 20% de ingresos pero genera más del 65% de la utilidad operativa. Es el negocio que financia todo lo demás." },
        { k: "Segmentos", v: "E-commerce, AWS, Publicidad, Prime", def: "La publicidad ya supera los $50B anuales. Prime tiene más de 200M de miembros. Amazon es mucho más que una tienda online." },
        { k: "Crecimiento ingresos", v: "~11% anual", def: "Crecimiento sólido para una empresa de su tamaño. AWS crece más del 17% anual." },
        { k: "Sin dividendos", v: "N/A", def: "Amazon no paga dividendos. Prefiere reinvertir en crecimiento: logística, IA, satélites Kuiper, healthcare." },
      ],
      en: [
        { k: "P/E Ratio (TTM)", v: "44x", def: "Looks expensive, but Amazon reinvested profits for 20 years. Now that AWS matures, margins are rising rapidly." },
        { k: "Net Margin", v: "9%", def: "Historically near 0% because it reinvested everything. Now reaches 9% thanks to AWS (~30% margin) which subsidizes e-commerce." },
        { k: "AWS (cloud)", v: "~17% revenue, ~67% operating income", def: "AWS represents less than 20% of revenue but generates over 65% of operating income. It's the business that funds everything else." },
        { k: "Segments", v: "E-commerce, AWS, Advertising, Prime", def: "Advertising already exceeds $50B annually. Prime has over 200M members. Amazon is much more than an online store." },
        { k: "Revenue growth", v: "~11% annual", def: "Solid growth for a company of its size. AWS grows over 17% annually." },
        { k: "No dividends", v: "N/A", def: "Amazon pays no dividends. It prefers to reinvest in growth: logistics, AI, Kuiper satellites, healthcare." },
      ],
    },
  },
};

const GLOSSARY_TERMS = {
  es: [
    { term: "ETF", def: "Exchange-Traded Fund. Un fondo que agrupa muchos activos (acciones, bonos) y se compra/vende en bolsa como si fuera una sola acción." },
    { term: "Acción", def: "Una fracción de propiedad de una empresa. Si compras 1 acción de Apple, eres dueño de una parte minúscula de Apple." },
    { term: "Dividendo", def: "Porción de las ganancias que una empresa reparte entre sus accionistas. No todas las empresas pagan dividendos." },
    { term: "P/E Ratio", def: "Precio sobre ganancias. Si una empresa cotiza a $100 y gana $5 por acción, su P/E es 20x. Ayuda a comparar si una acción es cara o barata." },
    { term: "Volatilidad", def: "Qué tanto sube y baja el precio de un activo. Alta volatilidad = cambios grandes y frecuentes. No es malo en sí mismo, pero aumenta el riesgo a corto plazo." },
    { term: "Diversificación", def: "No poner todos los huevos en la misma canasta. Invertir en múltiples activos para que el mal rendimiento de uno no destruya toda tu cartera." },
    { term: "Interés compuesto", def: "Ganar intereses sobre los intereses que ya ganaste. Es el motor más poderoso de crecimiento a largo plazo." },
    { term: "Bull Market", def: "Mercado alcista. Período prolongado donde los precios suben en general. Opuesto al Bear Market." },
    { term: "Bear Market", def: "Mercado bajista. Caída de 20% o más desde los máximos recientes. Históricamente duran menos que los mercados alcistas." },
    { term: "Índice bursátil", def: "Medida que representa el rendimiento de un grupo de empresas. El S&P 500 agrupa las 500 empresas más grandes de EE.UU." },
    { term: "Expense Ratio", def: "El costo anual de tener un ETF o fondo, expresado como porcentaje. Un ratio de 0.03% en $10,000 = $3 al año." },
    { term: "Liquidez", def: "Qué tan fácil es comprar o vender un activo sin afectar mucho su precio. Acciones de empresas grandes son muy líquidas." },
    { term: "ROE", def: "Return on Equity. Cuánta ganancia genera una empresa por cada dólar de capital propio. 20%+ se considera bueno." },
    { term: "VIX", def: "Índice del miedo. Mide la volatilidad esperada del S&P 500. VIX > 30 indica pánico en el mercado. Creado por CBOE." },
    { term: "Corrección", def: "Caída de 10-20% desde los máximos. Normal y saludable en mercados alcistas. No confundir con un crash." },
  ],
  en: [
    { term: "ETF", def: "Exchange-Traded Fund. A fund that groups many assets (stocks, bonds) and is bought/sold on the stock exchange like a single stock." },
    { term: "Stock", def: "A fraction of ownership in a company. If you buy 1 share of Apple, you own a tiny piece of Apple." },
    { term: "Dividend", def: "Portion of profits that a company distributes to its shareholders. Not all companies pay dividends." },
    { term: "P/E Ratio", def: "Price to Earnings. If a company trades at $100 and earns $5 per share, its P/E is 20x. Helps compare whether a stock is expensive or cheap." },
    { term: "Volatility", def: "How much an asset's price goes up and down. High volatility = large, frequent changes. Not bad in itself, but increases short-term risk." },
    { term: "Diversification", def: "Don't put all your eggs in one basket. Invest in multiple assets so the poor performance of one doesn't destroy your entire portfolio." },
    { term: "Compound Interest", def: "Earning interest on the interest you already earned. It's the most powerful engine of long-term growth." },
    { term: "Bull Market", def: "A prolonged period where prices generally rise. Opposite of Bear Market." },
    { term: "Bear Market", def: "A drop of 20% or more from recent highs. Historically shorter than bull markets." },
    { term: "Stock Index", def: "A measure representing the performance of a group of companies. The S&P 500 groups the 500 largest U.S. companies." },
    { term: "Expense Ratio", def: "The annual cost of holding an ETF or fund, expressed as a percentage. A ratio of 0.03% on $10,000 = $3 per year." },
    { term: "Liquidity", def: "How easy it is to buy or sell an asset without much affecting its price. Shares of large companies are very liquid." },
    { term: "ROE", def: "Return on Equity. How much profit a company generates per dollar of equity. 20%+ is considered good." },
    { term: "VIX", def: "Fear Index. Measures expected S&P 500 volatility. VIX > 30 indicates market panic. Created by CBOE." },
    { term: "Correction", def: "A drop of 10-20% from highs. Normal and healthy in bull markets. Don't confuse with a crash." },
  ],
};

const CHECKLIST_ITEMS = {
  es: [
    { id: "thesis", label: "Tesis de inversión", q: "¿Por qué crees que este activo tiene valor a largo plazo? Escríbelo con tus propias palabras.", placeholder: "Ej: Creo que NVDA seguirá creciendo porque la IA necesita sus chips y no hay alternativa equivalente todavía..." },
    { id: "catalyst", label: "Catalizadores", q: "¿Qué evento o tendencia podría hacer que el precio suba en los próximos 1-3 años?", placeholder: "Ej: Expansión de centros de datos, nuevos contratos, crecimiento de ingresos..." },
    { id: "risk", label: "Riesgos principales", q: "¿Qué podría salir mal? ¿Qué escenario te haría reconsiderar?", placeholder: "Ej: Competencia de AMD, cambio regulatorio, desaceleración de inversión en IA..." },
    { id: "allocation", label: "Tamaño de posición", q: "¿Qué % de tu cartera total representaría esta inversión? ¿Estás cómodo con eso?", placeholder: "Ej: Máximo 5% del total. Si cae 50%, pierdo 2.5% del total — eso lo puedo tolerar." },
    { id: "exit", label: "Criterio de salida", q: "¿Bajo qué circunstancias venderías? Define una regla antes de comprar.", placeholder: "Ej: Vendería si los fundamentos cambian (deuda excesiva, pérdida de ventaja competitiva) — no por precio." },
    { id: "emergency", label: "Fondo de emergencia", q: "¿Tienes 3-6 meses de gastos en efectivo FUERA de esta inversión?", placeholder: "Ej: Sí, tengo $X separados en cuenta de ahorro que no tocaré para invertir." },
  ],
  en: [
    { id: "thesis", label: "Investment thesis", q: "Why do you think this asset has long-term value? Write it in your own words.", placeholder: "Ex: I believe NVDA will keep growing because AI needs its chips and there's no equivalent alternative yet..." },
    { id: "catalyst", label: "Catalysts", q: "What event or trend could make the price rise over the next 1-3 years?", placeholder: "Ex: Data center expansion, new contracts, revenue growth..." },
    { id: "risk", label: "Main risks", q: "What could go wrong? What scenario would make you reconsider?", placeholder: "Ex: AMD competition, regulatory change, slowdown in AI investment..." },
    { id: "allocation", label: "Position size", q: "What % of your total portfolio would this investment represent? Are you comfortable with that?", placeholder: "Ex: Maximum 5% of total. If it drops 50%, I lose 2.5% of total — I can tolerate that." },
    { id: "exit", label: "Exit criteria", q: "Under what circumstances would you sell? Define a rule before you buy.", placeholder: "Ex: I would sell if fundamentals change (excessive debt, loss of competitive advantage) — not based on price." },
    { id: "emergency", label: "Emergency fund", q: "Do you have 3-6 months of expenses in cash OUTSIDE of this investment?", placeholder: "Ex: Yes, I have $X set aside in a savings account that I won't touch to invest." },
  ],
};

const RISK_SCENARIOS = {
  es: [
    {
      title: "Corrección del 10-20%",
      color: COLORS.amber,
      description: "Caída normal en mercados alcistas. Ocurre en promedio cada 1-2 años.",
      options: [
        "No hacer nada si tu tesis sigue intacta",
        "Revisar si las razones por las que compraste siguen vigentes",
        "Considerar comprar más si tienes capital disponible y el plan lo contempla",
        "Evitar ver el portfolio diariamente para no tomar decisiones emocionales",
      ],
    },
    {
      title: "Bear Market (-20% a -40%)",
      color: COLORS.red,
      description: "Caída significativa. Generalmente dura 6-18 meses. Históricamente siempre se recuperó.",
      options: [
        "Mantener si el horizonte es largo plazo (5+ años)",
        "Revisar tu plan y verificar que el fondo de emergencia esté intacto",
        "Aprovechar para comprar activos sólidos a precios reducidos si el plan lo contempla",
        "No vender por pánico — la mayoría de inversores que vendieron en caídas se arrepintieron",
      ],
    },
    {
      title: "Crash severo (-40% o más)",
      color: COLORS.purple,
      description: "Evento extremo (2008, 2020). Raro pero ocurre. El S&P 500 tardó 4 años en recuperarse en 2008.",
      options: [
        "Si tienes fondo de emergencia, no necesitas vender activos en pánico",
        "Históricamente, comprar durante crashes generó los mejores retornos a largo plazo",
        "Revisar si alguna posición individual tiene riesgo de quiebra (diferente a caída de precio)",
        "Mantener perspectiva: el mercado siempre se recuperó de todos los crashes históricos",
      ],
    },
    {
      title: "Una acción cae -50%",
      color: COLORS.textDim,
      description: "Diferente a caída del mercado. Puede ser problema específico de la empresa.",
      options: [
        "Investigar la CAUSA antes de cualquier decisión",
        "¿Es por el mercado en general o hay problema en la empresa?",
        "Si los fundamentos cambiaron (fraude, quiebra inminente, pérdida de ventaja), reconsiderar",
        "Si es caída de mercado sin cambio fundamental, mantener tu tesis original",
      ],
    },
  ],
  en: [
    {
      title: "10-20% Correction",
      color: COLORS.amber,
      description: "Normal drop in bull markets. Occurs on average every 1-2 years.",
      options: [
        "Do nothing if your thesis is still intact",
        "Review if the reasons you bought still apply",
        "Consider buying more if you have available capital and the plan contemplates it",
        "Avoid checking your portfolio daily to avoid emotional decisions",
      ],
    },
    {
      title: "Bear Market (-20% to -40%)",
      color: COLORS.red,
      description: "Significant decline. Generally lasts 6-18 months. Historically always recovered.",
      options: [
        "Hold if your time horizon is long-term (5+ years)",
        "Review your plan and verify your emergency fund is intact",
        "Take advantage to buy quality assets at reduced prices if your plan allows",
        "Don't sell out of panic — most investors who sold during drops regretted it",
      ],
    },
    {
      title: "Severe Crash (-40% or more)",
      color: COLORS.purple,
      description: "Extreme event (2008, 2020). Rare but happens. S&P 500 took 4 years to recover in 2008.",
      options: [
        "If you have an emergency fund, you don't need to sell assets in panic",
        "Historically, buying during crashes generated the best long-term returns",
        "Review if any individual position has bankruptcy risk (different from price drop)",
        "Keep perspective: the market always recovered from all historical crashes",
      ],
    },
    {
      title: "A stock drops -50%",
      color: COLORS.textDim,
      description: "Different from market drop. May be a company-specific problem.",
      options: [
        "Research the CAUSE before any decision",
        "Is it due to the general market or is there a problem in the company?",
        "If fundamentals changed (fraud, imminent bankruptcy, loss of advantage), reconsider",
        "If it's a market drop without fundamental change, maintain your original thesis",
      ],
    },
  ],
};

// ── UTILITY ─────────────────────────────────────────────────
function useLocalStorage(key, initial) {
  const [val, setVal] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initial;
    } catch {
      return initial;
    }
  });
  const set = (v) => {
    try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
    setVal(v);
  };
  return [val, set];
}

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const h = () => setWidth(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return width;
}

function useHashNav() {
  const getPage = () => {
    const h = window.location.hash.slice(1);
    return h || "home";
  };
  const [page, setPageState] = useState(getPage);
  useEffect(() => {
    const h = () => setPageState(getPage());
    window.addEventListener("hashchange", h);
    return () => window.removeEventListener("hashchange", h);
  }, []);
  const setPage = (p) => { window.location.hash = p; };
  return [page, setPage];
}

function compound(principal, monthly, years, rate) {
  const r = rate / 12;
  const n = years * 12;
  const fv =
    principal * Math.pow(1 + r, n) +
    monthly * ((Math.pow(1 + r, n) - 1) / r);
  return Math.round(fv);
}

function fmt(n) {
  return "$" + n.toLocaleString("en-US");
}

// ── COMPONENTS ──────────────────────────────────────────────
function Badge({ children, color }) {
  return (
    <span style={{
      background: color + "22",
      color: color,
      border: `1px solid ${color}44`,
      borderRadius: 6,
      padding: "2px 10px",
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: 0.5,
    }}>
      {children}
    </span>
  );
}

function Card({ children, style }) {
  return (
    <div style={{
      background: COLORS.surface,
      border: `1px solid ${COLORS.line}`,
      borderRadius: 16,
      padding: 24,
      ...style,
    }}>
      {children}
    </div>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ color: COLORS.text, fontSize: 26, fontWeight: 700, margin: 0 }}>{title}</h2>
      {subtitle && <p style={{ color: COLORS.textDim, marginTop: 8, fontSize: 15 }}>{subtitle}</p>}
    </div>
  );
}

// ── HOME ────────────────────────────────────────────────────
function Home({ lang, s, onNavigate }) {
  const modules = [
    { key: "quiz", icon: "🧭", color: COLORS.mint },
    { key: "explorer", icon: "🔍", color: COLORS.blue },
    { key: "glossary", icon: "📖", color: COLORS.amber },
    { key: "checklist", icon: "✅", color: COLORS.purple },
    { key: "riskcenter", icon: "🛡️", color: COLORS.red },
    { key: "calculator", icon: "📊", color: COLORS.mint },
    { key: "simulator", icon: "🎮", color: COLORS.amber },
  ];
  return (
    <div>
      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.surface2} 0%, ${COLORS.surface3} 100%)`,
        border: `1px solid ${COLORS.line}`,
        borderRadius: 20,
        padding: "48px 32px",
        marginBottom: 32,
        textAlign: "center",
      }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🌱</div>
        <h1 style={{ color: COLORS.text, fontSize: 32, fontWeight: 800, margin: "0 0 16px" }}>
          {s.home.hero}
        </h1>
        <p style={{ color: COLORS.textDim, fontSize: 17, maxWidth: 560, margin: "0 auto 28px", lineHeight: 1.6 }}>
          {s.home.heroSub}
        </p>
        <button
          onClick={() => onNavigate("quiz")}
          style={{
            background: COLORS.mint,
            color: "#0A0F1A",
            border: "none",
            borderRadius: 12,
            padding: "14px 28px",
            fontWeight: 700,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          {s.home.cta} →
        </button>
      </div>

      {/* Principle */}
      <Card style={{ marginBottom: 32, borderColor: COLORS.mint + "44" }}>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div style={{ fontSize: 28 }}>⚖️</div>
          <div>
            <h3 style={{ color: COLORS.mint, margin: "0 0 8px", fontSize: 16, fontWeight: 700 }}>
              {s.home.principle}
            </h3>
            <p style={{ color: COLORS.textDim, margin: 0, lineHeight: 1.6 }}>
              {s.home.principleText}
            </p>
          </div>
        </div>
      </Card>

      {/* Modules */}
      <h3 style={{ color: COLORS.text, marginBottom: 16 }}>{s.home.modules}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 16 }}>
        {modules.map((m) => (
          <Card
            key={m.key}
            style={{ cursor: "pointer", transition: "border-color 0.2s", borderColor: COLORS.line }}
            onClick={() => onNavigate(m.key)}
          >
            <div style={{ fontSize: 28, marginBottom: 10 }}>{m.icon}</div>
            <div style={{ color: m.color, fontWeight: 700, fontSize: 14 }}>
              {s.nav[m.key]}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ── QUIZ ────────────────────────────────────────────────────
function Quiz({ lang, s }) {
  const questions = QUIZ_QUESTIONS[lang];
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [done, setDone] = useLocalStorage("quiz-done", false);
  const [savedAnswers, setSavedAnswers] = useLocalStorage("quiz-answers", []);

  const select = (v) => {
    const next = [...answers];
    next[step] = v;
    setAnswers(next);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setSavedAnswers(next);
      setDone(true);
    }
  };

  const activeAnswers = done ? savedAnswers : answers;
  const score = activeAnswers.reduce((a, b) => a + b, 0);
  const profileKey = score <= 12 ? "conservative" : score <= 20 ? "moderate" : "aggressive";
  const profile = PROFILES[lang][profileKey];

  if (done) {
    return (
      <div>
        <SectionHeader title={s.quiz.result} />
        <Card style={{ borderColor: profile.color + "66", textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>
            {profileKey === "conservative" ? "🏦" : profileKey === "moderate" ? "⚖️" : "🚀"}
          </div>
          <Badge color={profile.color}>{profile.name}</Badge>
          <p style={{ color: COLORS.text, fontSize: 18, fontWeight: 600, margin: "16px 0 8px" }}>
            {profile.desc}
          </p>
          <div style={{
            background: COLORS.surface2,
            borderRadius: 12,
            padding: 16,
            margin: "16px 0",
            textAlign: "left",
          }}>
            <p style={{ color: COLORS.textDim, margin: 0, fontSize: 14, lineHeight: 1.6 }}>
              💡 {profile.suggestion}
            </p>
          </div>
          <p style={{ color: COLORS.textFaint, fontSize: 12, margin: "12px 0 20px" }}>
            {s.disclaimer}
          </p>
          <button
            onClick={() => { setDone(false); setSavedAnswers([]); setStep(0); setAnswers([]); }}
            style={{
              background: COLORS.surface2,
              color: COLORS.textDim,
              border: `1px solid ${COLORS.line}`,
              borderRadius: 10,
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            {s.quiz.restart}
          </button>
        </Card>
      </div>
    );
  }

  const q = questions[step];
  return (
    <div>
      <SectionHeader title={s.quiz.title} subtitle={s.quiz.subtitle} />
      <div style={{ color: COLORS.textFaint, marginBottom: 8, fontSize: 13 }}>
        {step + 1} / {questions.length}
      </div>
      <div style={{
        background: COLORS.surface2,
        height: 4,
        borderRadius: 2,
        marginBottom: 32,
        overflow: "hidden",
      }}>
        <div style={{
          background: COLORS.mint,
          width: `${((step + 1) / questions.length) * 100}%`,
          height: "100%",
          transition: "width 0.3s",
        }} />
      </div>
      <Card>
        <h3 style={{ color: COLORS.text, fontSize: 20, marginTop: 0, marginBottom: 24, lineHeight: 1.4 }}>
          {q.q}
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {q.opts.map((o) => (
            <button
              key={o.v}
              onClick={() => select(o.v)}
              style={{
                background: COLORS.surface2,
                border: `1px solid ${COLORS.line}`,
                borderRadius: 12,
                padding: "14px 18px",
                color: COLORS.text,
                textAlign: "left",
                cursor: "pointer",
                fontSize: 15,
                transition: "border-color 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.mint}
              onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.line}
            >
              {o.t}
            </button>
          ))}
        </div>
        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            style={{
              background: "none",
              border: "none",
              color: COLORS.textFaint,
              cursor: "pointer",
              marginTop: 20,
              fontSize: 14,
            }}
          >
            ← {s.quiz.prev}
          </button>
        )}
      </Card>
    </div>
  );
}

// ── EXPLORER ────────────────────────────────────────────────
function Explorer({ lang, s }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [openMetric, setOpenMetric] = useState(null);

  const search = () => {
    const t = TICKERS[query.toUpperCase()];
    setSelected(t || null);
    setOpenMetric(null);
  };

  const ticker = selected;
  const metrics = ticker?.metrics[lang] || [];

  return (
    <div>
      <SectionHeader title={s.explorer.title} subtitle={s.explorer.subtitle} />
      <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === "Enter" && search()}
          placeholder={s.explorer.search}
          style={{
            flex: 1,
            background: COLORS.surface,
            border: `1px solid ${COLORS.line}`,
            borderRadius: 12,
            padding: "12px 16px",
            color: COLORS.text,
            fontSize: 15,
            outline: "none",
          }}
        />
        <button
          onClick={search}
          style={{
            background: COLORS.mint,
            color: "#0A0F1A",
            border: "none",
            borderRadius: 12,
            padding: "12px 20px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          🔍
        </button>
      </div>

      {/* Quick picks */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
        {Object.keys(TICKERS).map(t => (
          <button
            key={t}
            onClick={() => { setQuery(t); setSelected(TICKERS[t]); setOpenMetric(null); }}
            style={{
              background: COLORS.surface2,
              border: `1px solid ${COLORS.line}`,
              borderRadius: 8,
              padding: "6px 14px",
              color: COLORS.textDim,
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {selected === null && query && (
        <Card><p style={{ color: COLORS.textDim }}>{s.explorer.noResult}</p></Card>
      )}

      {ticker && (
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6 }}>
                <h3 style={{ color: COLORS.text, margin: 0, fontSize: 22 }}>{query.toUpperCase()}</h3>
                <Badge color={ticker.type === "ETF" ? COLORS.blue : COLORS.mint}>{ticker.type}</Badge>
              </div>
              <p style={{ color: COLORS.textDim, margin: 0 }}>{ticker.name}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: COLORS.mint, fontSize: 24, fontWeight: 700 }}>{ticker.price}</div>
              <div style={{ color: COLORS.textFaint, fontSize: 12 }}>{lang === "es" ? "precio ref." : "ref. price"}</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {metrics.map((m, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenMetric(openMetric === i ? null : i)}
                  style={{
                    width: "100%",
                    background: openMetric === i ? COLORS.surface2 : COLORS.surface3,
                    border: `1px solid ${openMetric === i ? COLORS.mint + "44" : COLORS.line}`,
                    borderRadius: 10,
                    padding: "12px 16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    color: COLORS.text,
                    textAlign: "left",
                  }}
                >
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{m.k}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ color: COLORS.mint, fontWeight: 700 }}>{m.v}</span>
                    <span style={{ color: COLORS.textFaint }}>{openMetric === i ? "▲" : "▼"}</span>
                  </div>
                </button>
                {openMetric === i && (
                  <div style={{
                    background: COLORS.surface2,
                    border: `1px solid ${COLORS.mint + "33"}`,
                    borderTop: "none",
                    borderRadius: "0 0 10px 10px",
                    padding: "12px 16px",
                  }}>
                    <p style={{ color: COLORS.textDim, margin: 0, fontSize: 14, lineHeight: 1.6 }}>
                      💡 {m.def}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

// ── GLOSSARY ────────────────────────────────────────────────
function Glossary({ lang, s }) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(null);
  const terms = GLOSSARY_TERMS[lang];
  const filtered = terms.filter(t =>
    t.term.toLowerCase().includes(search.toLowerCase()) ||
    t.def.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <SectionHeader title={s.glossary.title} subtitle={s.glossary.subtitle} />
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder={s.glossary.search}
        style={{
          width: "100%",
          background: COLORS.surface,
          border: `1px solid ${COLORS.line}`,
          borderRadius: 12,
          padding: "12px 16px",
          color: COLORS.text,
          fontSize: 15,
          outline: "none",
          marginBottom: 24,
          boxSizing: "border-box",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map((t, i) => (
          <div key={i}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                width: "100%",
                background: open === i ? COLORS.surface2 : COLORS.surface,
                border: `1px solid ${open === i ? COLORS.amber + "44" : COLORS.line}`,
                borderRadius: 10,
                padding: "14px 18px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                color: COLORS.text,
                textAlign: "left",
              }}
            >
              <span style={{ fontWeight: 700 }}>{t.term}</span>
              <span style={{ color: COLORS.textFaint }}>{open === i ? "▲" : "▼"}</span>
            </button>
            {open === i && (
              <div style={{
                background: COLORS.surface2,
                border: `1px solid ${COLORS.amber + "33"}`,
                borderTop: "none",
                borderRadius: "0 0 10px 10px",
                padding: "14px 18px",
              }}>
                <p style={{ color: COLORS.textDim, margin: 0, lineHeight: 1.7 }}>{t.def}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── CHECKLIST ───────────────────────────────────────────────
function Checklist({ lang, s }) {
  const items = CHECKLIST_ITEMS[lang];
  const [notes, setNotes] = useLocalStorage("checklist-notes", {});
  const [done, setDone] = useLocalStorage("checklist-done", {});

  const allDone = items.every(i => done[i.id]);

  return (
    <div>
      <SectionHeader title={s.checklist.title} subtitle={s.checklist.subtitle} />
      {allDone && (
        <Card style={{ borderColor: COLORS.mint + "66", marginBottom: 24, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>✅</div>
          <h3 style={{ color: COLORS.mint, margin: "0 0 8px" }}>{s.checklist.complete}</h3>
          <p style={{ color: COLORS.textDim, margin: 0 }}>{s.checklist.completeText}</p>
        </Card>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {items.map((item) => (
          <Card key={item.id} style={{ borderColor: done[item.id] ? COLORS.mint + "44" : COLORS.line }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <button
                onClick={() => setDone({ ...done, [item.id]: !done[item.id] })}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  border: `2px solid ${done[item.id] ? COLORS.mint : COLORS.line}`,
                  background: done[item.id] ? COLORS.mint : "transparent",
                  cursor: "pointer",
                  flexShrink: 0,
                  marginTop: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#0A0F1A",
                  fontWeight: 700,
                  fontSize: 14,
                }}
              >
                {done[item.id] ? "✓" : ""}
              </button>
              <div style={{ flex: 1 }}>
                <div style={{ color: COLORS.text, fontWeight: 700, marginBottom: 4 }}>{item.label}</div>
                <p style={{ color: COLORS.textDim, fontSize: 14, margin: "0 0 12px" }}>{item.q}</p>
                <textarea
                  value={notes[item.id] || ""}
                  onChange={e => setNotes({ ...notes, [item.id]: e.target.value })}
                  placeholder={item.placeholder}
                  rows={3}
                  style={{
                    width: "100%",
                    background: COLORS.surface2,
                    border: `1px solid ${COLORS.line}`,
                    borderRadius: 8,
                    padding: "10px 12px",
                    color: COLORS.text,
                    fontSize: 14,
                    resize: "vertical",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
      <button
        onClick={() => { setNotes({}); setDone({}); }}
        style={{
          background: "none",
          border: `1px solid ${COLORS.line}`,
          borderRadius: 10,
          padding: "10px 20px",
          color: COLORS.textFaint,
          cursor: "pointer",
          marginTop: 20,
          fontSize: 14,
        }}
      >
        ↺ {s.checklist.reset}
      </button>
    </div>
  );
}

// ── RISK CENTER ─────────────────────────────────────────────
function RiskCenter({ lang, s }) {
  const [open, setOpen] = useState(0);
  const scenarios = RISK_SCENARIOS[lang];
  return (
    <div>
      <SectionHeader title={s.riskcenter.title} subtitle={s.riskcenter.subtitle} />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {scenarios.map((sc, i) => (
          <div key={i}>
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              style={{
                width: "100%",
                background: open === i ? COLORS.surface2 : COLORS.surface,
                border: `1px solid ${open === i ? sc.color + "66" : COLORS.line}`,
                borderRadius: 12,
                padding: "16px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                color: COLORS.text,
                textAlign: "left",
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>
                  <span style={{ color: sc.color, marginRight: 8 }}>●</span>
                  {sc.title}
                </div>
                <div style={{ color: COLORS.textFaint, fontSize: 13, marginTop: 4 }}>{sc.description}</div>
              </div>
              <span style={{ color: COLORS.textFaint, marginLeft: 16 }}>{open === i ? "▲" : "▼"}</span>
            </button>
            {open === i && (
              <div style={{
                background: COLORS.surface2,
                border: `1px solid ${sc.color + "33"}`,
                borderTop: "none",
                borderRadius: "0 0 12px 12px",
                padding: "16px 20px",
              }}>
                <ul style={{ margin: 0, padding: "0 0 0 20px" }}>
                  {sc.options.map((o, j) => (
                    <li key={j} style={{ color: COLORS.textDim, marginBottom: 10, lineHeight: 1.6, fontSize: 14 }}>
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── CALCULATOR ──────────────────────────────────────────────
function Calculator({ lang, s }) {
  const [initial, setInitial] = useState("10000");
  const [monthly, setMonthly] = useState("500");
  const [years, setYears] = useState("20");
  const [results, setResults] = useState(null);

  const calculate = () => {
    const p = parseFloat(initial) || 0;
    const m = parseFloat(monthly) || 0;
    const y = parseInt(years) || 10;
    setResults({
      conservative: compound(p, m, y, 0.07),
      moderate: compound(p, m, y, 0.10),
      optimistic: compound(p, m, y, 0.13),
      total: p + m * y * 12,
      years: y,
    });
  };

  const inputStyle = {
    width: "100%",
    background: COLORS.surface2,
    border: `1px solid ${COLORS.line}`,
    borderRadius: 10,
    padding: "12px 14px",
    color: COLORS.text,
    fontSize: 16,
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div>
      <SectionHeader title={s.calculator.title} subtitle={s.calculator.subtitle} />
      <Card style={{ marginBottom: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 16, marginBottom: 20 }}>
          <div>
            <label style={{ color: COLORS.textDim, fontSize: 13, display: "block", marginBottom: 6 }}>{s.calculator.initial}</label>
            <input style={inputStyle} value={initial} onChange={e => setInitial(e.target.value)} type="number" />
          </div>
          <div>
            <label style={{ color: COLORS.textDim, fontSize: 13, display: "block", marginBottom: 6 }}>{s.calculator.monthly}</label>
            <input style={inputStyle} value={monthly} onChange={e => setMonthly(e.target.value)} type="number" />
          </div>
          <div>
            <label style={{ color: COLORS.textDim, fontSize: 13, display: "block", marginBottom: 6 }}>{s.calculator.years}</label>
            <input style={inputStyle} value={years} onChange={e => setYears(e.target.value)} type="number" />
          </div>
        </div>
        <button
          onClick={calculate}
          style={{
            background: COLORS.mint,
            color: "#0A0F1A",
            border: "none",
            borderRadius: 12,
            padding: "14px 28px",
            fontWeight: 700,
            fontSize: 16,
            cursor: "pointer",
            width: "100%",
          }}
        >
          {s.calculator.calculate}
        </button>
      </Card>

      {results && (
        <div>
          <h3 style={{ color: COLORS.textDim, fontSize: 14, marginBottom: 16 }}>
            {s.calculator.rangeTitle} {results.years} {lang === "es" ? "años" : "years"} —
            {" "}{lang === "es" ? "aportado total" : "total contributed"}: <span style={{ color: COLORS.text }}>{fmt(results.total)}</span>
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: s.calculator.conservative, val: results.conservative, color: COLORS.blue, pct: 7 },
              { label: s.calculator.moderate, val: results.moderate, color: COLORS.mint, pct: 10 },
              { label: s.calculator.optimistic, val: results.optimistic, color: COLORS.amber, pct: 13 },
            ].map((r) => (
              <Card key={r.pct} style={{ borderColor: r.color + "44" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <Badge color={r.color}>{r.label}</Badge>
                  </div>
                  <div style={{ color: r.color, fontSize: 28, fontWeight: 800 }}>{fmt(r.val)}</div>
                </div>
                <div style={{ marginTop: 12 }}>
                  <div style={{ background: COLORS.surface2, borderRadius: 4, height: 6, overflow: "hidden" }}>
                    <div style={{
                      background: r.color,
                      width: `${Math.min((r.val / results.optimistic) * 100, 100)}%`,
                      height: "100%",
                    }} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <p style={{ color: COLORS.textFaint, fontSize: 12, marginTop: 20, lineHeight: 1.6 }}>
            ⚠️ {s.calculator.disclaimer}
          </p>
        </div>
      )}
    </div>
  );
}

// ── SIMULATOR ───────────────────────────────────────────────
const TICKER_RETURNS = {
  VOO: 0.105, SPY: 0.104, QQQ: 0.18, SCHD: 0.12,
  NVDA: 0.40, AAPL: 0.28, MSFT: 0.26, AMZN: 0.22,
};

const TOTAL_CAPITAL = 10000;

function Simulator({ lang, s }) {
  const [alloc, setAlloc] = useLocalStorage("sim-alloc", {});

  const tickers = Object.keys(TICKERS);
  const totalAllocated = Object.values(alloc).reduce((a, b) => a + b, 0);
  const remaining = TOTAL_CAPITAL - totalAllocated;

  const adjust = (ticker, delta) => {
    const cur = alloc[ticker] || 0;
    const next = Math.max(0, Math.min(cur + delta, cur + remaining));
    if (next === 0) {
      const copy = { ...alloc };
      delete copy[ticker];
      setAlloc(copy);
    } else {
      setAlloc({ ...alloc, [ticker]: next });
    }
  };

  const reset = () => setAlloc({});

  const activeAlloc = Object.entries(alloc).filter(([, v]) => v > 0);

  const projections = activeAlloc.map(([ticker, amount]) => {
    const rate = TICKER_RETURNS[ticker] ?? 0.10;
    const projected = Math.round(amount * Math.pow(1 + rate, 10));
    return { ticker, amount, projected, rate };
  });

  const totalProjected = projections.reduce((a, b) => a + b.projected, 0);

  const numAssets = activeAlloc.length;
  const divScore = numAssets <= 1 ? "low" : numAssets <= 3 ? "med" : "high";
  const divColor = divScore === "low" ? COLORS.red : divScore === "med" ? COLORS.amber : COLORS.mint;
  const divLabel = s.simulator[`div${divScore.charAt(0).toUpperCase() + divScore.slice(1)}`];

  const STEP = 500;

  return (
    <div>
      <SectionHeader title={s.simulator.title} subtitle={s.simulator.subtitle} />

      {/* Capital bar */}
      <Card style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ color: COLORS.textDim, fontSize: 13 }}>{s.simulator.capital}: <span style={{ color: COLORS.text, fontWeight: 700 }}>${TOTAL_CAPITAL.toLocaleString()}</span></span>
          <span style={{ color: COLORS.textDim, fontSize: 13 }}>{s.simulator.remaining}: <span style={{ color: remaining > 0 ? COLORS.mint : COLORS.textFaint, fontWeight: 700 }}>${remaining.toLocaleString()}</span></span>
        </div>
        <div style={{ background: COLORS.surface2, borderRadius: 6, height: 10, overflow: "hidden" }}>
          <div style={{ background: COLORS.mint, width: `${(totalAllocated / TOTAL_CAPITAL) * 100}%`, height: "100%", transition: "width 0.3s" }} />
        </div>
        <div style={{ textAlign: "right", marginTop: 6 }}>
          <button onClick={reset} style={{ background: "none", border: "none", color: COLORS.textFaint, cursor: "pointer", fontSize: 13 }}>↺ {s.simulator.reset}</button>
        </div>
      </Card>

      {/* Asset grid */}
      <h3 style={{ color: COLORS.textDim, fontSize: 13, fontWeight: 600, marginBottom: 12, letterSpacing: 0.5 }}>{s.simulator.assets.toUpperCase()}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 12, marginBottom: 32 }}>
        {tickers.map(ticker => {
          const cur = alloc[ticker] || 0;
          const t = TICKERS[ticker];
          const pct = totalAllocated > 0 ? Math.round((cur / TOTAL_CAPITAL) * 100) : 0;
          return (
            <Card key={ticker} style={{ padding: 16, borderColor: cur > 0 ? COLORS.mint + "55" : COLORS.line }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div>
                  <span style={{ color: COLORS.text, fontWeight: 700, fontSize: 15 }}>{ticker}</span>
                  <Badge color={t.type === "ETF" ? COLORS.blue : COLORS.mint} style={{ marginLeft: 6 }}>{t.type}</Badge>
                </div>
                {cur > 0 && <span style={{ color: COLORS.mint, fontWeight: 700, fontSize: 13 }}>{pct}%</span>}
              </div>
              <div style={{ color: COLORS.textFaint, fontSize: 12, marginBottom: 10 }}>{t.name}</div>
              <div style={{ color: cur > 0 ? COLORS.mint : COLORS.textFaint, fontWeight: 700, fontSize: 16, marginBottom: 10 }}>
                ${cur.toLocaleString()}
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  onClick={() => adjust(ticker, -STEP)}
                  disabled={cur === 0}
                  style={{ flex: 1, background: COLORS.surface2, border: `1px solid ${COLORS.line}`, borderRadius: 8, padding: "6px 0", color: cur === 0 ? COLORS.textFaint : COLORS.text, cursor: cur === 0 ? "default" : "pointer", fontWeight: 700, fontSize: 16 }}
                >−</button>
                <button
                  onClick={() => adjust(ticker, STEP)}
                  disabled={remaining < STEP}
                  style={{ flex: 1, background: remaining >= STEP ? COLORS.mint : COLORS.surface2, border: "none", borderRadius: 8, padding: "6px 0", color: remaining >= STEP ? "#0A0F1A" : COLORS.textFaint, cursor: remaining >= STEP ? "pointer" : "default", fontWeight: 700, fontSize: 16 }}
                >+</button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Results */}
      {activeAlloc.length === 0 ? (
        <Card>
          <p style={{ color: COLORS.textDim, textAlign: "center", margin: 0 }}>{s.simulator.emptyMsg}</p>
        </Card>
      ) : (
        <>
          {/* Diversification */}
          <Card style={{ marginBottom: 20, borderColor: divColor + "44" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ color: COLORS.textDim, fontSize: 13, marginBottom: 4 }}>{s.simulator.diversification}</div>
                <div style={{ color: divColor, fontWeight: 700 }}>{divLabel}</div>
              </div>
              <div style={{ fontSize: 28 }}>{divScore === "low" ? "⚠️" : divScore === "med" ? "⚖️" : "✅"}</div>
            </div>
          </Card>

          {/* Breakdown table */}
          <Card style={{ marginBottom: 20 }}>
            <div style={{ color: COLORS.textDim, fontSize: 13, fontWeight: 600, marginBottom: 16 }}>{s.simulator.projection}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {projections.map(({ ticker, amount, projected, rate }) => (
                <div key={ticker}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ color: COLORS.text, fontWeight: 700 }}>{ticker}</span>
                    <span style={{ color: COLORS.mint, fontWeight: 700 }}>${projected.toLocaleString()}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ color: COLORS.textFaint, fontSize: 12 }}>${amount.toLocaleString()} · {Math.round(rate * 100)}% {lang === "es" ? "retorno hist." : "hist. return"}</span>
                    <span style={{ color: COLORS.textFaint, fontSize: 12 }}>x{(projected / amount).toFixed(1)}</span>
                  </div>
                  <div style={{ background: COLORS.surface2, borderRadius: 3, height: 4, overflow: "hidden" }}>
                    <div style={{ background: COLORS.mint, width: `${Math.min((amount / TOTAL_CAPITAL) * 100, 100)}%`, height: "100%" }} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ borderTop: `1px solid ${COLORS.line}`, marginTop: 16, paddingTop: 16, display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: COLORS.textDim }}>{s.simulator.projected} total</span>
              <span style={{ color: COLORS.amber, fontWeight: 800, fontSize: 22 }}>${totalProjected.toLocaleString()}</span>
            </div>
          </Card>

          <p style={{ color: COLORS.textFaint, fontSize: 11, lineHeight: 1.6 }}>⚠️ {s.simulator.disclaimer}</p>
        </>
      )}
    </div>
  );
}

// ── APP SHELL ────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useLocalStorage("app-lang", "es");
  const [page, setPage] = useHashNav();
  const [menuOpen, setMenuOpen] = useState(false);
  const width = useWindowWidth();
  const isDesktop = width >= 768;
  const s = STR[lang];

  const navItems = ["home", "quiz", "explorer", "glossary", "checklist", "riskcenter", "calculator", "simulator"];

  const pages = {
    home: <Home lang={lang} s={s} onNavigate={setPage} />,
    quiz: <Quiz lang={lang} s={s} />,
    explorer: <Explorer lang={lang} s={s} />,
    glossary: <Glossary lang={lang} s={s} />,
    checklist: <Checklist lang={lang} s={s} />,
    riskcenter: <RiskCenter lang={lang} s={s} />,
    calculator: <Calculator lang={lang} s={s} />,
    simulator: <Simulator lang={lang} s={s} />,
  };

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      {/* Top bar */}
      <div style={{
        background: COLORS.surface,
        borderBottom: `1px solid ${COLORS.line}`,
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 60,
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        {/* Logo */}
        <button
          onClick={() => { setPage("home"); setMenuOpen(false); }}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}
        >
          <span style={{ fontSize: 22 }}>🌱</span>
          <span style={{ color: COLORS.mint, fontWeight: 800, fontSize: 18 }}>{s.appName}</span>
        </button>

        {/* Desktop nav */}
        {isDesktop && (
          <nav style={{ display: "flex", gap: 4, alignItems: "center" }}>
            {navItems.map(key => (
              <button
                key={key}
                onClick={() => setPage(key)}
                style={{
                  background: page === key ? COLORS.surface2 : "none",
                  border: `1px solid ${page === key ? COLORS.mint + "55" : "transparent"}`,
                  borderRadius: 8,
                  padding: "6px 12px",
                  color: page === key ? COLORS.mint : COLORS.textDim,
                  cursor: "pointer",
                  fontWeight: page === key ? 700 : 400,
                  fontSize: 13,
                  whiteSpace: "nowrap",
                  transition: "color 0.15s, background 0.15s",
                }}
                onMouseEnter={e => { if (page !== key) e.currentTarget.style.color = COLORS.text; }}
                onMouseLeave={e => { if (page !== key) e.currentTarget.style.color = COLORS.textDim; }}
              >
                {s.nav[key]}
              </button>
            ))}
          </nav>
        )}

        {/* Right controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            style={{
              background: COLORS.surface2,
              border: `1px solid ${COLORS.line}`,
              borderRadius: 8,
              padding: "5px 12px",
              color: COLORS.textDim,
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            {lang === "es" ? "EN" : "ES"}
          </button>
          {/* Hamburger — solo en mobile */}
          {!isDesktop && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: COLORS.textDim, fontSize: 22 }}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {!isDesktop && menuOpen && (
        <div style={{
          position: "fixed",
          top: 60,
          left: 0,
          right: 0,
          bottom: 0,
          background: COLORS.surface,
          zIndex: 99,
          padding: 24,
          overflowY: "auto",
        }}>
          {navItems.map(key => (
            <button
              key={key}
              onClick={() => { setPage(key); setMenuOpen(false); }}
              style={{
                display: "block",
                width: "100%",
                background: page === key ? COLORS.surface2 : "none",
                border: `1px solid ${page === key ? COLORS.mint + "44" : "transparent"}`,
                borderRadius: 12,
                padding: "14px 18px",
                color: page === key ? COLORS.mint : COLORS.textDim,
                textAlign: "left",
                cursor: "pointer",
                fontWeight: page === key ? 700 : 400,
                fontSize: 16,
                marginBottom: 8,
              }}
            >
              {s.nav[key]}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "32px 16px 80px" }}>
        {pages[page] ?? pages["home"]}
      </div>

      {/* Disclaimer footer */}
      <div style={{
        borderTop: `1px solid ${COLORS.line}`,
        padding: "16px",
        textAlign: "center",
      }}>
        <p style={{ color: COLORS.textFaint, fontSize: 11, margin: 0 }}>
          {s.disclaimer}
        </p>
      </div>
    </div>
  );
}
