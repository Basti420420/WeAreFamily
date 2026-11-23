// NUR öffentliche Supabase-Zugangsdaten eintragen: Projekt-URL + Publishable/anon Key.
// Service-Role, VAPID-Private-Key, Datenbankpasswort NIEMALS hier eintragen!
window.FAMILIENHERZ_CONFIG = {
  supabaseUrl: "HIER_SUPABASE_URL_EINTRAGEN",
  supabaseKey: "HIER_PUBLISHABLE_ODER_ANON_KEY_EINTRAGEN",
  vapidPublicKey: "", // Optional: öffentlicher VAPID-Schlüssel NACH Server-Einrichtung
};
