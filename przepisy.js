function obliczNabial(dania) {
    const dniZMlekiem = new Set();
    const dniZSerem = new Set();
    const dniZJogurtem = new Set();

    (dania || []).forEach(function(danie) {
        // staramy się znaleźć unikalną reprezentację dnia - używamy pola data_posilku, a jeśli go nie ma, ignorujemy
        const dzien = danie.data_posilku || danie.data || null;
        const teksty = (danie.skladniki || []).map(function(s) { return (s.nazwa || '').toLowerCase(); });

        if (teksty.some(t => t.indexOf('mleko') !== -1)) {
            if (dzien) dniZMlekiem.add(dzien);
        }
        if (teksty.some(t => t.indexOf('ser') !== -1 || t.indexOf('twarog') !== -1 || t.indexOf('twaróg') !== -1)) {
            if (dzien) dniZSerem.add(dzien);
        }
        if (teksty.some(t => t.indexOf('jogurt') !== -1)) {
            if (dzien) dniZJogurtem.add(dzien);
        }
    });

    return {
        mleko: dniZMlekiem.size,
        ser: dniZSerem.size,
        jogurt: dniZJogurtem.size
    };
}

function czyDanieJestUPF(danie) {
    return !!(danie && danie.ocena_zgodnosci && danie.ocena_zgodnosci.cechy_dania && danie.ocena_zgodnosci.cechy_dania.ultra_processed);
}

// --- wstawka: reguły dodatkowe (UPF i nabiał) będą używane w renderujZgodnoscRozporzadzenie()
