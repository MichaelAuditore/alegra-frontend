import type { NextConfig } from "next";
import createNexIntlPlugin from "next-intl/plugin";

const withNextIntl = createNexIntlPlugin('./app/i18n/request.ts');
const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
