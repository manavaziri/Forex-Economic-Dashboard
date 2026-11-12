import pandas as pd
def input_File(file, month, source, Type_value):

    # --------------------------------------------------
    # 1. Read CSV file
    # --------------------------------------------------

    

    df = pd.read_csv(
        file,
        encoding="utf-8-sig",
        header=None
    )

    # --------------------------------------------------
    # 2. Remove unwanted TradingView rows
    # --------------------------------------------------

    remove_values = {
        "36 matches", "No matches", "Forex Screener", "myforexn",
        "Overview", "Performance", "Oscillators", "Trend-Following",
        "1D", "1W", "All Pairs", "currencyagainst", "Filters",
        "Change %", "Column setup", "Bollinger Lower Band (20)",
    }

    df = df[
        ~df.iloc[:, 0].astype(str).str.strip().isin(remove_values)
    ]

    df.drop_duplicates(inplace=True)

    # --------------------------------------------------
    # 3. Set column headers
    # --------------------------------------------------

    df.columns = df.iloc[0]
    df = df.iloc[1:].reset_index(drop=True)

    # --------------------------------------------------
    # 4. Combine pairs of rows
    # --------------------------------------------------

    new_rows = []

    for i in range(0, len(df) - 1, 2):

        row_values = df.iloc[i].copy()
        row_name = df.iloc[i + 1]

        row_values.iloc[0] = row_name.iloc[0]

        new_rows.append(row_values)

    df_new = pd.DataFrame(new_rows).reset_index(drop=True)

    # --------------------------------------------------
    # 5. Create Ticker
    # --------------------------------------------------

    df_new["Ticker"] = df_new.iloc[:, 0].astype(str).str[:6]

    df_str = df_new.astype(str)
    df_str["Ticker"] = df_str["Ticker"].str[:6]

    # --------------------------------------------------
    # 6. Display USD data for inspection
    # --------------------------------------------------

    mask_usd = df_str["Ticker"].str.contains(
        "usd",
        case=False,
        na=False
    )

    df_usd = df_str[mask_usd].copy()

    colres = [
        "Ticker", "Price", "EMA10", "EMA20",
        "Stoch RSI Fast", "Stoch RSI Slow"
    ]

    df_usd = df_usd[
        [col for col in colres if col in df_usd.columns]
    ]

    print("USD data from daily file:", df_usd)

    # --------------------------------------------------
    # 7. Count S, B and N signals
    # --------------------------------------------------

    df_new["S_count"] = df_str.apply(
        lambda r: r.str.contains(r'\bS\b', na=False).sum(),
        axis=1
    )

    df_new["B_count"] = df_str.apply(
        lambda r: r.str.contains(r'\bB\b', na=False).sum(),
        axis=1
    )

    df_new["N_count"] = df_str.apply(
        lambda r: r.str.contains(r'\bN\b', na=False).sum(),
        axis=1
    )

    # --------------------------------------------------
    # 8. Clean values
    # --------------------------------------------------

    df_new = df_new.replace(
        to_replace=r'[\?\_]|(?:\s*[SBN]\b)',
        value='',
        regex=True
    )

    df_new = df_new.replace("−", "-", regex=True)

    # Convert missing-value markers to NaN
    df_new = df_new.replace(
        to_replace=r'^\s*(?:—|–|n/a)\s*$',
        value=pd.NA,
        regex=True
    )

    daily_file = df_new.apply(
        lambda col: col.astype(str).str.strip()
    )

    # --------------------------------------------------
    # 9. Select required columns
    # --------------------------------------------------

    daily_file = daily_file[[
        "Ticker", "BB Low", "Price", "BB Up", "Chg %",
        "High", "Low", "Monthly Perf", "Weekly Perf",
        "1-Month High", "1-Month Low",
        "6-Month Perf", "3-Month Perf",
        "MACD Level", "MACD Signal",
        "Stoch RSI Fast", "Stoch RSI Slow",
        "EMA10", "EMA20", "EMA50", "EMA100",
        "S_count", "B_count", "N_count"
    ]]

    # --------------------------------------------------
    # 10. Rename columns
    # --------------------------------------------------

    daily_file.columns = [
        "Ticker", "BolDown", "Price", "BolUp", "ChangeP",
        "High", "Low", "ChangePM", "ChangePW",
        "HighM", "LowM", "ChangeP6M", "ChangeP3M",
        "MACDL", "MACDS", "StoRSIK", "StoRSID",
        "Ema10", "Ema20", "Ema50", "Ema100",
        "S_count", "B_count", "N_count"
    ]

    # --------------------------------------------------
    # 11. Remove percentage signs
    # --------------------------------------------------

    percent_cols = [
        "ChangeP", "ChangePM", "ChangePW",
        "ChangeP6M", "ChangeP3M"
    ]

    daily_file[percent_cols] = daily_file[percent_cols].replace(
        "%",
        "",
        regex=True
    )

    # --------------------------------------------------
    # 12. Convert numeric columns
    # --------------------------------------------------

    numeric_cols = [
        "B_count", "S_count",
        "BolDown", "Price", "BolUp",
        "ChangeP", "High", "Low",
        "ChangePM", "ChangePW",
        "HighM", "LowM",
        "ChangeP6M", "ChangeP3M",
        "MACDL", "MACDS",
        "StoRSIK", "StoRSID",
        "Ema10", "Ema20", "Ema50", "Ema100"
    ]

    for col in numeric_cols:
        daily_file[col] = pd.to_numeric(
            daily_file[col],
            errors="coerce"
        )

    # --------------------------------------------------
    # 13. Calculate Buy - Sell
    # --------------------------------------------------

    daily_file["B_S"] = (
        daily_file["B_count"].fillna(0)
        - daily_file["S_count"].fillna(0)
    )

    # --------------------------------------------------
    # 14. Select final columns
    # --------------------------------------------------

    daily_file = daily_file[[
        "Ticker", "BolDown", "Price", "BolUp",
        "ChangeP", "High", "Low",
        "ChangePM", "ChangePW",
        "HighM", "LowM",
        "ChangeP6M", "ChangeP3M",
        "MACDS", "StoRSID", "StoRSIK", "MACDL",
        "Ema10", "Ema20", "Ema50", "Ema100",
        "B_S"
    ]]

    # --------------------------------------------------
    # 15. Add metadata
    # --------------------------------------------------

    daily_file["Month"] = month
    daily_file["source_file"] = source
    daily_file["Type"] = Type_value

    # --------------------------------------------------
    # 16. Return result
    # --------------------------------------------------

    #msg = f"File {filen}.csv processed successfully."
    #قبلاً نام فایل را از متغیر filen می‌گرفتیم. حالا فایل از Flask دریافت می‌شود
    # و ویژگی file.filename نام اصلی فایل آپلودشده را در اختیارمان می‌گذارد.
    msg = f"File {file.filename} processed successfully."

    return daily_file, msg